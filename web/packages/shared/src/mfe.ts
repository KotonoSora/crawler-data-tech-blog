// MFE contract (spec 07 file 02/03): each remote registers one custom element that the
// shell mounts; state flows down as attributes, and navigation flows up as the
// `tb:navigate` CustomEvent (bubbles + composed). No cross-remote imports.

import { createElement, type ComponentType } from 'react'
import { createRoot, type Root } from 'react-dom/client'

export const MF_NAVIGATE = 'tb:navigate'

export interface NavigateDetail {
  to: string
  replace?: boolean
}

export interface MfeProps {
  /** All HTML attributes currently set on the host element (kebab-case names). */
  attrs: Record<string, string>
  /** Ask the shell to navigate; remotes never touch the router directly. */
  navigate: (to: string, opts?: { replace?: boolean }) => void
}

export function requestNavigate(target: HTMLElement, to: string, replace = false): void {
  target.dispatchEvent(
    new CustomEvent<NavigateDetail>(MF_NAVIGATE, {
      detail: { to, replace },
      bubbles: true,
      composed: true,
    }),
  )
}

/**
 * Defines a custom element that mounts a React component into itself (light DOM).
 * `observed` lists the attributes that trigger a re-render of the component.
 */
export function createMfeElement(
  tag: string,
  component: ComponentType<MfeProps>,
  observed: string[] = [],
): void {
  if (customElements.get(tag)) return

  class MfeElement extends HTMLElement {
    static get observedAttributes(): string[] {
      return observed
    }

    private root?: Root

    connectedCallback(): void {
      if (!this.root) this.root = createRoot(this)
      this.renderApp()
    }

    disconnectedCallback(): void {
      this.root?.unmount()
      this.root = undefined
    }

    attributeChangedCallback(): void {
      this.renderApp()
    }

    private renderApp(): void {
      if (!this.root) return
      const attrs: Record<string, string> = {}
      for (const name of this.getAttributeNames()) attrs[name] = this.getAttribute(name) ?? ''
      this.root.render(
        createElement(component, {
          attrs,
          navigate: (to, opts) => requestNavigate(this, to, opts?.replace ?? false),
        }),
      )
    }
  }

  customElements.define(tag, MfeElement)
}
