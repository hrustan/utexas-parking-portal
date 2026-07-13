import { useLocation, useNavigate } from 'react-router-dom';
import { useAppData } from '../../context/AppDataContext';
import { placeOrder as apiPlaceOrder } from '../../api/client';
import { PageShell } from '../../components/layout/PageShell';
import { Button } from '../../components/ui/Button';
import { SegmentedControl } from '../../components/ui/SegmentedControl';
import { OptionCard } from '../../components/ui/OptionCard';
import { SummaryRail } from '../../components/ui/SummaryRail';
import { QRCode } from '../../components/QRCode';
import { ArrowLeftIcon, CheckIcon } from '../../components/icons';
import type { OptionCategory, PaymentMethod, PurchaseOption } from '../../types/models';
import { usePurchaseFlow } from './usePurchaseFlow';
import { cn } from '../../lib/cn';
import styles from './PurchaseFlow.module.css';

const TYPE_SEGMENTS: Array<{ value: OptionCategory; label: string }> = [
  { value: 'permits', label: 'Permits' },
  { value: 'passes', label: 'Passes' },
  { value: 'daypass', label: 'Day Pass' },
];

interface StepSelectProps {
  type: OptionCategory;
  options: PurchaseOption[];
  selectedId: string | null;
  onType: (t: OptionCategory) => void;
  onSelect: (id: string) => void;
}

function StepSelect({ type, options, selectedId, onType, onSelect }: StepSelectProps) {
  return (
    <div>
      <div className={styles.segment}>
        <SegmentedControl
          options={TYPE_SEGMENTS}
          value={type}
          onChange={onType}
          ariaLabel="Permit or pass type"
        />
      </div>
      <div className={styles.options} role="radiogroup" aria-label="Available options">
        {options.map((option) => (
          <OptionCard
            key={option.id}
            option={option}
            selected={option.id === selectedId}
            onSelect={() => onSelect(option.id)}
          />
        ))}
      </div>
      {type === 'permits' && (
        <div className={styles.eligibility}>
          More permit types appear here based on your eligibility (student,
          faculty/staff, ADA). This concept shows a representative sample.
        </div>
      )}
    </div>
  );
}

function StepAgreement({
  agreed,
  onToggle,
}: {
  agreed: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={styles.agreementCard}>
      <div className={styles.agreementTitle}>Agreement for Permits and Passes</div>
      <div className={styles.terms} data-scroll>
        <p>
          Permits and passes are non-transferable and valid only for the
          effective dates shown.
        </p>
        <p>
          You must attach your account vehicles to your permit or pass. Only
          vehicles attached to your permit are valid for parking.
        </p>
        <p>
          Your license plate is your displayed credential. Enforcement is by
          license plate only, and it is your responsibility to keep vehicle
          information current.
        </p>
        <p>
          Fees are non-refundable except as described in the parking policy.
          Prorated pricing, if applicable, is calculated at checkout.
        </p>
        <p>
          Citations cannot be paid via What I Owe (WIO) or Payroll Deduction and
          are billed separately.
        </p>
      </div>
      <button type="button" className={styles.checkboxRow} onClick={onToggle}>
        <span
          className={cn(styles.checkbox, agreed && styles.checkboxChecked)}
          aria-hidden="true"
        >
          {agreed && <CheckIcon size={15} strokeWidth={3} />}
        </span>
        <span className={styles.checkboxLabel}>
          I have read and agree to the Agreement for Permits and Passes.
        </span>
      </button>
    </div>
  );
}

function StepReview({ payment }: { payment: PaymentMethod | undefined }) {
  return (
    <div>
      <div className={styles.paymentRow}>
        <div className={styles.paymentLeft}>
          <div className={styles.cardBrand}>{payment?.brand.toUpperCase() ?? 'CARD'}</div>
          <div>
            <div className={styles.paymentName}>
              {payment?.brand ?? 'Card'} ···· {payment?.last4 ?? '0000'}
            </div>
            <div className={styles.paymentSub}>Default payment</div>
          </div>
        </div>
        <button type="button" className={styles.changeBtn}>
          Change
        </button>
      </div>
      <p className={styles.reviewNote}>
        By placing this order you agree to the permit/pass agreement. Prorated
        pricing, if applicable, is reflected in your summary.
      </p>
    </div>
  );
}

function Confirmation({
  option,
  orderNo,
  onViewPermits,
}: {
  option: PurchaseOption | null;
  orderNo: string | null;
  onViewPermits: () => void;
}) {
  return (
    <div className={styles.done}>
      <span className={styles.doneCircle}>
        <CheckIcon size={40} />
      </span>
      <div className={styles.doneTitle}>Order placed</div>
      <div className={styles.doneBody}>
        Your {option?.name ?? 'order'} has been added to your account. A receipt
        was emailed to you.
      </div>
      <div className={styles.orderCard}>
        <QRCode size={110} />
        <div>
          <div className={styles.orderLabel}>Order number</div>
          <div className={styles.orderNo}>{orderNo}</div>
          <div className={styles.orderHint}>Show this QR at the garage entry.</div>
        </div>
      </div>
      <Button className={styles.doneCta} onClick={onViewPermits}>
        View in Permits
      </Button>
    </div>
  );
}

export function PurchaseFlowPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = useAppData();

  const initialType =
    (location.state as { type?: OptionCategory } | null)?.type ?? 'permits';

  const flow = usePurchaseFlow(
    data?.options ?? { permits: [], passes: [], daypass: [] },
    initialType,
  );

  if (!data) return null;

  const { step } = flow.state;
  const defaultPayment = data.paymentMethods.find((p) => p.isDefault);

  const handlePrimary = async () => {
    if (step === 'select' || step === 'agreement') {
      flow.next();
    } else if (step === 'review') {
      const { orderNo } = await apiPlaceOrder(flow.selectedOption?.id ?? '');
      flow.placeOrder(orderNo);
    } else {
      navigate('/permits');
    }
  };

  const handleBack = () => {
    if (step === 'select') {
      navigate('/permits');
    } else {
      flow.back();
    }
  };

  return (
    <PageShell maxWidth={860}>
      {step !== 'done' ? (
        <>
          <div className={styles.header}>
            <button type="button" className={styles.back} onClick={handleBack}>
              <ArrowLeftIcon size={18} strokeWidth={2.2} />
              Back
            </button>
            <div className={styles.headerTitle}>Get a Permit or Pass</div>
            <span className={styles.stepChip}>{flow.stepLabel}</span>
          </div>

          {step === 'select' && (
            <p className={styles.intro}>
              Choose the permit or pass you want. Many names are similar — full
              details are shown on each option.
            </p>
          )}

          <div className={styles.layout}>
            <div>
              {step === 'select' && (
                <StepSelect
                  type={flow.state.type}
                  options={flow.visibleOptions}
                  selectedId={flow.state.selectedOptionId}
                  onType={flow.setType}
                  onSelect={flow.selectOption}
                />
              )}
              {step === 'agreement' && (
                <StepAgreement
                  agreed={flow.state.agreed}
                  onToggle={flow.toggleAgree}
                />
              )}
              {step === 'review' && <StepReview payment={defaultPayment} />}
            </div>

            <SummaryRail
              option={flow.selectedOption}
              action={
                <Button
                  fullWidth
                  disabled={flow.primaryDisabled}
                  onClick={handlePrimary}
                >
                  {flow.primaryLabel}
                </Button>
              }
            />
          </div>
        </>
      ) : (
        <Confirmation
          option={flow.selectedOption}
          orderNo={flow.state.orderNo}
          onViewPermits={() => navigate('/permits')}
        />
      )}
    </PageShell>
  );
}
