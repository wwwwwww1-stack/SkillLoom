import { memo, useCallback } from 'react'
import { Plus, Settings } from 'lucide-react'
import type { TFunction } from 'i18next'

type HeaderProps = {
  language: string
  loading: boolean
  onToggleLanguage: () => void
  onOpenSettings: () => void
  onOpenAdd: () => void
  t: TFunction
}

const isTauriEnv =
  typeof window !== 'undefined' &&
  Boolean(
    (window as { __TAURI_INTERNALS__?: unknown }).__TAURI_INTERNALS__,
  )

const Header = ({
  language,
  loading,
  onToggleLanguage,
  onOpenSettings,
  onOpenAdd,
  t,
}: HeaderProps) => {
  const handleMouseDown = useCallback(
    async (e: React.MouseEvent<HTMLElement>) => {
      // Only handle left mouse button
      if (e.button !== 0) return
      // Don't drag if clicking a button or interactive element
      const target = e.target as HTMLElement
      if (target.closest('button')) return
      if (!isTauriEnv) return
      try {
        const { getCurrentWindow } = await import('@tauri-apps/api/window')
        await getCurrentWindow().startDragging()
      } catch {
        // ignore errors
      }
    },
    [],
  )

  return (
    <header className="skills-header" onMouseDown={handleMouseDown}>
      <div className="brand-area">
        <img className="logo-icon" src="/logo.png" alt="" />
        <div className="brand-text-wrap">
          <div className="brand-text">{t('appName')}</div>
          <div className="brand-subtitle">{t('subtitle')}</div>
        </div>
      </div>
      <div className="header-actions">
        <button className="lang-btn" type="button" onClick={onToggleLanguage}>
          {language === 'en' ? t('languageShort.en') : t('languageShort.zh')}
        </button>
        <button className="icon-btn" type="button" onClick={onOpenSettings}>
          <Settings size={18} />
        </button>
        <button
          className="btn btn-primary"
          type="button"
          onClick={onOpenAdd}
          disabled={loading}
        >
          <Plus size={16} />
          {t('newSkill')}
        </button>
      </div>
    </header>
  )
}

export default memo(Header)
