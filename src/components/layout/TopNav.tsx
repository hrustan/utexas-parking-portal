import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../../lib/cn';
import { useAppData } from '../../context/AppDataContext';
import { BellIcon } from '../icons';
import styles from './TopNav.module.css';

const NAV_ITEMS = [
  { to: '/', label: 'Home', end: true },
  { to: '/permits', label: 'Permits & Passes', end: false },
  { to: '/vehicles', label: 'Vehicles', end: false },
  { to: '/citations', label: 'Citations', end: false },
];

export function TopNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { data } = useAppData();
  const user = data?.user;

  return (
    <header className={styles.nav}>
      <div className={styles.inner}>
        <button
          type="button"
          className={styles.brand}
          onClick={() => navigate('/')}
          aria-label="Parking Portal home"
        >
          <span className={styles.brandChip}>
            <img
              src="/brand/texas-seal.png"
              alt="The University of Texas at Austin"
              className={styles.seal}
            />
          </span>
        </button>

        <nav className={styles.pills}>
          {NAV_ITEMS.map((item) => {
            // Keep "Permits & Passes" active throughout the purchase flow.
            const forceActive =
              item.to === '/permits' && pathname.startsWith('/permits');
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(styles.pill, (isActive || forceActive) && styles.pillActive)
                }
              >
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className={styles.right}>
          <button type="button" className={styles.iconBtn} aria-label="Notifications">
            <BellIcon size={19} />
          </button>
          <button
            type="button"
            className={styles.account}
            onClick={() => navigate('/account')}
          >
            <span className={styles.avatar}>{user?.initials ?? '··'}</span>
            <span className={styles.firstName}>{user?.firstName ?? ''}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
