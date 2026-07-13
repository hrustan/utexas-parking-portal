import { useMemo, useReducer } from 'react';
import type { OptionCategory, PurchaseOption, PurchaseOptions } from '../../types/models';

export type Step = 'select' | 'agreement' | 'review' | 'done';

interface State {
  step: Step;
  type: OptionCategory;
  selectedOptionId: string | null;
  agreed: boolean;
  orderNo: string | null;
}

type Action =
  | { kind: 'SET_TYPE'; type: OptionCategory }
  | { kind: 'SELECT_OPTION'; id: string }
  | { kind: 'TOGGLE_AGREE' }
  | { kind: 'NEXT' }
  | { kind: 'BACK' }
  | { kind: 'PLACE_ORDER'; orderNo: string };

function reducer(state: State, action: Action): State {
  switch (action.kind) {
    case 'SET_TYPE':
      // Switching type clears the selection so gating re-locks.
      return { ...state, type: action.type, selectedOptionId: null };
    case 'SELECT_OPTION':
      return { ...state, selectedOptionId: action.id };
    case 'TOGGLE_AGREE':
      return { ...state, agreed: !state.agreed };
    case 'NEXT':
      if (state.step === 'select') return { ...state, step: 'agreement' };
      if (state.step === 'agreement') return { ...state, step: 'review' };
      return state;
    case 'BACK':
      if (state.step === 'review') return { ...state, step: 'agreement' };
      if (state.step === 'agreement') return { ...state, step: 'select' };
      return state;
    case 'PLACE_ORDER':
      return { ...state, step: 'done', orderNo: action.orderNo };
    default:
      return state;
  }
}

const STEP_NUMBER: Record<Step, number> = {
  select: 1,
  agreement: 2,
  review: 3,
  done: 3,
};

const PRIMARY_LABEL: Record<Step, string> = {
  select: 'Continue',
  agreement: 'Agree & Continue',
  review: 'Place Order',
  done: 'View in Permits',
};

export function usePurchaseFlow(
  options: PurchaseOptions,
  initialType: OptionCategory = 'permits',
) {
  const [state, dispatch] = useReducer(reducer, {
    step: 'select',
    type: initialType,
    selectedOptionId: null,
    agreed: false,
    orderNo: null,
  });

  const visibleOptions: PurchaseOption[] = options[state.type];

  const selectedOption = useMemo(
    () =>
      visibleOptions.find((o) => o.id === state.selectedOptionId) ?? null,
    [visibleOptions, state.selectedOptionId],
  );

  const primaryDisabled =
    (state.step === 'select' && !state.selectedOptionId) ||
    (state.step === 'agreement' && !state.agreed);

  return {
    state,
    visibleOptions,
    selectedOption,
    stepNumber: STEP_NUMBER[state.step],
    stepLabel: state.step === 'done' ? 'Confirmed' : `Step ${STEP_NUMBER[state.step]} of 3`,
    primaryLabel: PRIMARY_LABEL[state.step],
    primaryDisabled,
    setType: (type: OptionCategory) => dispatch({ kind: 'SET_TYPE', type }),
    selectOption: (id: string) => dispatch({ kind: 'SELECT_OPTION', id }),
    toggleAgree: () => dispatch({ kind: 'TOGGLE_AGREE' }),
    next: () => dispatch({ kind: 'NEXT' }),
    back: () => dispatch({ kind: 'BACK' }),
    placeOrder: (orderNo: string) => dispatch({ kind: 'PLACE_ORDER', orderNo }),
  };
}
