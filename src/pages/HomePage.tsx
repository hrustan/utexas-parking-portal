import { useNavigate } from 'react-router-dom';
import { useAppData } from '../context/AppDataContext';
import { PageShell } from '../components/layout/PageShell';
import { AnnouncementBanner } from '../components/AnnouncementBanner';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StatTile } from '../components/ui/StatTile';
import { StatusPill } from '../components/ui/StatusPill';
import { SectionLabel } from '../components/ui/SectionLabel';
import {
  AlertTriangleIcon,
  BuildingIcon,
  CalendarIcon,
  CarIcon,
  CheckIcon,
  ChevronRightIcon,
  DocumentIcon,
  HelpCircleIcon,
  ListIcon,
  LockIcon,
  PlusIcon,
  ReceiptIcon,
} from '../components/icons';
import { formatCurrency } from '../lib/format';
import { cn } from '../lib/cn';
import type { GarageStatus } from '../types/models';
import styles from './HomePage.module.css';

const GARAGE_STATUS_LABEL: Record<GarageStatus, string> = {
  open: 'Open',
  limited: 'Limited',
  closed: 'Closed',
};

/** MM/DD/YYYY → sortable timestamp. */
function toTime(date: string): number {
  const [m = 0, d = 0, y = 0] = date.split('/').map(Number);
  return new Date(y, m - 1, d).getTime();
}

export function HomePage() {
  const navigate = useNavigate();
  const {
    data,
    hasActivePermit,
    permitCount,
    vehicleCount,
    balance,
    openAddVehicle,
  } = useAppData();

  if (!data) return null;

  const permit = data.permits[0];
  const summaryLine = permit
    ? `${permit.typeName.replace('Permit', 'permit')} · ${permit.permitNo} · valid to ${permit.expires}`
    : 'No active permit on file.';

  const quickActions = [
    {
      icon: <CalendarIcon size={20} />,
      title: 'Surface day pass',
      subtitle: 'Park for a single day',
      onClick: () => navigate('/permits/new', { state: { type: 'daypass' } }),
    },
    {
      icon: <CarIcon size={20} />,
      title: 'Add a vehicle',
      subtitle: 'Register a plate',
      onClick: openAddVehicle,
    },
    {
      icon: <DocumentIcon size={20} />,
      title: 'View citations',
      subtitle: 'Appeals & letters',
      onClick: () => navigate('/citations'),
    },
    {
      icon: <ListIcon size={20} />,
      title: 'Join a waitlist',
      subtitle: 'Add / edit waitlists',
      onClick: () => {},
    },
  ];

  // Recent activity is derived from citations + account letters, newest first.
  const activity = [
    ...data.citations.map((c) => ({
      id: c.id,
      icon: <ReceiptIcon size={16} />,
      title: `Citation ${c.number}`,
      meta: c.status,
      date: c.date,
      amount: formatCurrency(c.amount),
      onClick: () => navigate('/citations'),
    })),
    ...data.letters.map((l) => ({
      id: l.id,
      icon: <DocumentIcon size={16} />,
      title: l.subject,
      meta: 'Account letter',
      date: l.date,
      amount: undefined as string | undefined,
      onClick: () => navigate('/account'),
    })),
  ]
    .sort((a, b) => toTime(b.date) - toTime(a.date))
    .slice(0, 4);

  const alert = data.garageAlert;

  return (
    <PageShell maxWidth={860}>
      <AnnouncementBanner />

      <div className={styles.titleRow}>
        <h1 className={styles.title}>Parking Portal</h1>
        <div className={styles.session}>
          <LockIcon size={14} strokeWidth={2} />
          Secure UT EID session
        </div>
      </div>

      <div className={styles.hero}>
        <Card elevated className={styles.statusCard}>
          <div className={styles.statusHead}>
            <span className={styles.checkCircle}>
              <CheckIcon size={26} />
            </span>
            <div>
              <div className={styles.statusTitle}>You're set to park</div>
              <div className={styles.statusSub}>{summaryLine}</div>
            </div>
          </div>
          <div className={styles.statGrid}>
            <StatTile
              value={permitCount}
              label="Permit"
              valueTone="success"
              onClick={() => navigate('/permits')}
            />
            <StatTile
              value={vehicleCount}
              label="Vehicles"
              onClick={() => navigate('/vehicles')}
            />
            <StatTile
              value={formatCurrency(balance)}
              label="Balance"
              valueTone={balance < 0 ? 'danger' : 'success'}
              onClick={() => navigate('/citations')}
            />
          </div>
        </Card>

        <Card tone="dark" elevated className={styles.actionCard}>
          <div>
            <div className={styles.actionTitle}>
              {hasActivePermit ? 'Need more parking?' : 'Need parking?'}
            </div>
            <div className={styles.actionSub}>
              Buy a permit or pass in a few quick steps.
            </div>
          </div>
          <div className={styles.actionButtons}>
            <Button
              fullWidth
              leftIcon={<PlusIcon size={18} />}
              onClick={() => navigate('/permits/new')}
            >
              Buy a permit or pass
            </Button>
            <Button
              variant="outline"
              fullWidth
              onClick={() => navigate('/permits/new', { state: { type: 'daypass' } })}
            >
              Surface day pass
            </Button>
          </div>
        </Card>
      </div>

      <SectionLabel className={styles.sectionGap}>Campus &amp; account</SectionLabel>
      <div className={styles.infoGrid}>
        <div className={styles.infoCol}>
          {permit ? (
            <Card className={styles.permitCard}>
              <div className={styles.cardHead}>
                <span className={styles.cardHeadLabel}>Active permit</span>
                <StatusPill dot>{permit.status}</StatusPill>
              </div>
              <div className={styles.permitName}>{permit.typeName}</div>
              <div className={styles.permitNo}>{permit.permitNo}</div>
              <div className={styles.permitMeta}>
                <div>
                  <span className={styles.metaLabel}>Valid through</span>
                  <span className={styles.metaValue}>{permit.expires}</span>
                </div>
                <div>
                  <span className={styles.metaLabel}>Vehicles</span>
                  <span className={styles.metaValue}>
                    {permit.attachedVehicleCount} attached
                  </span>
                </div>
              </div>
              <button
                type="button"
                className={styles.cardLink}
                onClick={() => navigate('/permits')}
              >
                Manage permit
                <ChevronRightIcon size={16} />
              </button>
            </Card>
          ) : (
            <Card className={styles.permitCard}>
              <div className={styles.cardHead}>
                <span className={styles.cardHeadLabel}>Active permit</span>
              </div>
              <div className={styles.permitEmpty}>No active permit on file.</div>
              <button
                type="button"
                className={styles.cardLink}
                onClick={() => navigate('/permits/new')}
              >
                Buy a permit
                <ChevronRightIcon size={16} />
              </button>
            </Card>
          )}

          <Card className={styles.activityCard}>
            <div className={styles.cardHead}>
              <span className={styles.cardHeadLabel}>Recent activity</span>
            </div>
            <div className={styles.activityList}>
              {activity.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={styles.activityRow}
                  onClick={item.onClick}
                >
                  <span className={styles.activityIcon}>{item.icon}</span>
                  <span className={styles.activityText}>
                    <span className={styles.activityTitle}>{item.title}</span>
                    <span className={styles.activityMeta}>{item.meta}</span>
                  </span>
                  <span className={styles.activityRight}>
                    {item.amount && (
                      <span className={styles.activityAmount}>{item.amount}</span>
                    )}
                    <span className={styles.activityDate}>{item.date}</span>
                  </span>
                </button>
              ))}
            </div>
          </Card>
        </div>

        <Card className={styles.garageCard}>
          {alert && (
            <div className={styles.garageAlert}>
              <AlertTriangleIcon size={18} className={styles.garageAlertIcon} />
              <div>
                <div className={styles.garageAlertTitle}>
                  Garage closures · {alert.date}
                </div>
                <div className={styles.garageAlertMsg}>{alert.message}</div>
                <button type="button" className={styles.garageAlertLink}>
                  {alert.linkLabel}
                  <ChevronRightIcon size={14} />
                </button>
              </div>
            </div>
          )}

          <div className={styles.cardHead}>
            <span className={styles.cardHeadLabel}>
              <BuildingIcon size={16} className={styles.garageHeadIcon} />
              Garage availability
            </span>
            <span className={styles.garageLive}>
              <span className={styles.livePulse} />
              Live
            </span>
          </div>

          <div className={styles.garageList}>
            {data.garages.slice(0, 7).map((g) => (
              <div key={g.code} className={styles.garageRow}>
                <span className={styles.garageName}>
                  {g.name}
                  <span className={styles.garageCode}>{g.code}</span>
                </span>
                <span className={cn(styles.garageStatus, styles[`s_${g.status}`])}>
                  {GARAGE_STATUS_LABEL[g.status]}
                </span>
              </div>
            ))}
          </div>

          <a
            className={styles.garageMapLink}
            href="https://utdirect.utexas.edu/apps/fasweb/parking/garage-availability/nlogon/"
            target="_blank"
            rel="noreferrer"
          >
            View full garage map
            <ChevronRightIcon size={16} />
          </a>
        </Card>
      </div>

      <SectionLabel className={styles.quickLabel}>Quick actions</SectionLabel>
      <div className={styles.quickGrid}>
        {quickActions.map((action) => (
          <button
            key={action.title}
            type="button"
            className={styles.quickCard}
            onClick={action.onClick}
          >
            <span className={styles.quickIcon}>{action.icon}</span>
            <span className={styles.quickTitle}>{action.title}</span>
            <span className={styles.quickSub}>{action.subtitle}</span>
          </button>
        ))}
      </div>

      <button type="button" className={styles.helpRow}>
        <span className={styles.helpLabel}>
          <HelpCircleIcon size={20} />
          Need help? Frequently Asked Questions
        </span>
        <ChevronRightIcon size={19} className={styles.helpChevron} />
      </button>
    </PageShell>
  );
}
