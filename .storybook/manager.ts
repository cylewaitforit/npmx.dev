import { addons } from 'storybook/manager-api'

import npmxDark from './theme'

// On mobile, the toolbar element must stay in the DOM to keep sectionRef.current
// valid in the landmark registry — removing it leaves a stale null ref that causes
// compareDocumentPosition to throw in MobileNavigation.
const STYLE_ID = 'npmx-hide-toolbar-mobile'
const TOOLBAR_SELECTOR = '[data-testid="sb-preview-toolbar"]'

function setMobileToolbarHidden(hidden: boolean): void {
  const existing = document.getElementById(STYLE_ID)
  if (hidden && !existing) {
    const style = document.createElement('style')
    style.id = STYLE_ID
    style.textContent = `@media (max-width: 599px) { ${TOOLBAR_SELECTOR} { display: none !important; } }`
    document.head.appendChild(style)
  } else if (!hidden && existing) {
    existing.remove()
  }
}

addons.setConfig({
  theme: npmxDark,
  layoutCustomisations: {
    showToolbar: (state, defaultValue) => {
      const isHideToolbarPage =
        state.viewMode === 'docs' &&
        state.storyId != null &&
        (state.index?.[state.storyId]?.tags ?? []).includes('hide-toolbar')

      if (!isHideToolbarPage) {
        setMobileToolbarHidden(false)
        return defaultValue
      }

      const isMobile = window.matchMedia('(max-width: 599px)').matches
      setMobileToolbarHidden(isMobile)
      return isMobile
    },
  },
})
