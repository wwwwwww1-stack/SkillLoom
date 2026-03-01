import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Home, Settings, Box } from 'lucide-react';
import { clsx } from 'clsx';
import { useTranslation } from 'react-i18next';

const NavItem = ({ to, icon: Icon, label }: { to: string; icon: React.ElementType; label: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={clsx(
        "flex items-center gap-3 px-3 py-2 rounded-[10px] transition-all duration-200 select-none",
        isActive
          ? "bg-[var(--accent-primary)] text-white shadow-sm font-medium"
          : "text-[var(--text-secondary)] hover:bg-[var(--bg-element-hover)] hover:text-[var(--text-primary)]"
      )}
    >
      <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
      <span className="text-[13px]">{label}</span>
    </Link>
  );
};

export const Layout = () => {
  const { t } = useTranslation();

  return (
    <div className="flex h-screen bg-[var(--bg-app)] text-[var(--text-primary)] overflow-hidden selection:bg-[var(--accent-soft-bg)] selection:text-[var(--accent-primary)]">
      {/* Sidebar */}
      <aside className="w-[240px] border-r border-[var(--border-subtle)] flex flex-col p-4 bg-[var(--bg-sidebar)] backdrop-blur-xl relative z-10">
        <div className="flex items-center gap-3 px-2 mt-2 mb-8">
          <div className="w-8 h-8 rounded-xl shadow-sm bg-[var(--accent-primary)] flex items-center justify-center">
            <Box className="text-white" size={18} strokeWidth={2.5} />
          </div>
          <span className="font-semibold text-sm tracking-tight">{t('appName')}</span>
        </div>

        <nav className="flex-1 space-y-1">
          <NavItem to="/" icon={Home} label={t('layout.navDashboard')} />
          <NavItem to="/skills" icon={Box} label={t('layout.navSkills')} />
          <NavItem to="/settings" icon={Settings} label={t('layout.navSettings')} />
        </nav>

        <div className="text-[11px] font-medium text-[var(--text-tertiary)] px-2 mb-2">
          {t('layout.versionLabel')}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-[var(--bg-app)] relative z-0">
        <Outlet />
      </main>
    </div>
  );
};
