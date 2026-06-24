import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchOverlay from './SearchOverlay';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // ── Scroll: toggle white background on scroll & hide/show on scroll direction ──
  useEffect(() => {
    let prevScrollY = window.scrollY;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Scrolled state for background color/shadow
      setScrolled(currentScrollY > 20);

      // Hide/Show navbar based on scroll direction
      if (currentScrollY > prevScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      
      prevScrollY = currentScrollY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initial check
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Active nav link: update which item has the active underline ──
  useEffect(() => {
    const container = document.getElementById('zyro-navbar-container');
    if (!container) return;

    // Remove active from all
    container.querySelectorAll('.item-content-wrapper--active').forEach(el => {
      el.classList.remove('item-content-wrapper--active');
    });

    // Determine current page key
    const path = location.pathname;
    const page =
      path === '/' || path === ''           ? 'home'
      : path.includes('services')           ? 'services'
      : path.includes('about')              ? 'about'
      : path.includes('contact')            ? 'contact'
      : 'home';

    // Set active on correct item (both desktop + mobile nav)
    container.querySelectorAll(`[data-qa="navigation-item-${page}"]`).forEach(el => {
      el.classList.add('item-content-wrapper--active');
    });
  }, [location.pathname]);

  // ── Click handler: Search + SPA routing ──
  useEffect(() => {
    const handleClick = (e) => {
      const btn = e.target.closest('[data-element-ref="z2AIKy"]');
      if (btn) {
        e.preventDefault();
        e.stopPropagation();
        setSearchOpen(true);
        return;
      }
      const link = e.target.closest('a');
      if (link && link.href) {
        const url = new URL(link.href);
        if (url.origin === window.location.origin || url.origin === 'https://knighterrant.com') {
          e.preventDefault();
          navigate(url.pathname);
          window.scrollTo(0, 0);
        }
      }
    };
    const nav = document.getElementById('zyro-navbar-container');
    if (nav) {
      nav.addEventListener('click', handleClick);
      return () => nav.removeEventListener('click', handleClick);
    }
  }, [navigate]);

  const bgColor = scrolled ? 'rgb(255,255,255)' : 'transparent';
  const boxShadow = scrolled ? '0 2px 20px rgba(0,0,0,0.08)' : 'none';

  return (
    <>
      <div
        id="zyro-navbar-container"
        className={isVisible ? "navbar-visible" : "navbar-hidden"}
        dangerouslySetInnerHTML={{
          __html: `<div class="top-blocks--sticky top-blocks"><!----><header class="block-header" style="--nav-link-font-weight:400;--nav-link-text-color:#0d141a;--nav-link-text-color-hover:#0d141a;--header-height-mobile:74px;--width:1240px;--padding-top:30px;--padding:30px 16px 30px 16px;--padding-right:16px;--padding-bottom:30px;--padding-left:16px;--m-padding-top:24px;--m-padding:24px 16px 24px 16px;--m-padding-right:16px;--m-padding-bottom:24px;--m-padding-left:16px;--logo-width:41px;--cartIconSize:24px;--link-spacing:32px;--m-logo-width:76.23369598388672px;--m-link-spacing:20px;--element-spacing:36px;--contrastBackgroundColor:rgb(224,224,224);--background-color:${bgColor};--box-shadow:${boxShadow};" backgroundcolorcontrast="rgb(224,224,224)" height="112" is-in-preview-mode="false" is-preview-mobile-view="false" data-v-06cc56f8=""><div class="background" style="--background-color: transparent;" data-v-06cc56f8=""></div><!--[--><div class="block-header-layout-desktop block-header-layout-desktop--desktop-3" style="--v5c616aa5:min-content auto repeat(1, min-content);--v2e94a9f4:0px;" data-v-c1535ecd=""><!--[--><a class="block-header-logo block-header__logo" href="https://knighterrant.com/" data-v-06cc56f8="" style="--v6f401cb2:41px;--v5ef47fbb:41px;--b298f7c8:24px;--b1fe0892:24;--v6313685a:400;--v66b767ed:76.23369598388672px;--v56669be0:76px;--v00407601:24px;" data-v-2fe39434=""><img class="block-header-logo__image" src="/logo.png" alt="Knight Errant logo" data-v-2fe39434="" data-qa="builder-siteheader-img-logo"></a><!--]--><!--[--><nav class="block-header__nav" data-v-06cc56f8=""><ul class="block-header__nav-links" data-v-06cc56f8="" data-qa="builder-siteheader-emptyspace"><!--[--><li class="block-header-item" data-v-06cc56f8="" data-v-f7e431f3=""><label class="block-header-item__label" data-v-f7e431f3=""><!----><div class="item-content-wrapper item-content-wrapper--active block-header-item__item" aria-haspopup="false" data-v-f7e431f3="" data-v-76d5a5f3="" data-qa="navigation-item-home"><a class="item-content" target="" href="https://knighterrant.com/" data-v-76d5a5f3="" data-qa="navigationblock-page-active-home">Home</a><!----></div><!----></label></li><li class="block-header-item" data-v-06cc56f8="" data-v-f7e431f3=""><label class="block-header-item__label" data-v-f7e431f3=""><!----><div class="item-content-wrapper block-header-item__item" aria-haspopup="false" data-v-f7e431f3="" data-v-76d5a5f3="" data-qa="navigation-item-services"><a class="item-content" target="" href="https://knighterrant.com/services" data-v-76d5a5f3="" data-qa="navigationblock-page-services">Services</a><!----></div><!----></label></li><li class="block-header-item" data-v-06cc56f8="" data-v-f7e431f3=""><label class="block-header-item__label" data-v-f7e431f3=""><!----><div class="item-content-wrapper block-header-item__item" aria-haspopup="false" data-v-f7e431f3="" data-v-76d5a5f3="" data-qa="navigation-item-about"><a class="item-content" target="" href="https://knighterrant.com/about" data-v-76d5a5f3="" data-qa="navigationblock-page-about">About</a><!----></div><!----></label></li><li class="block-header-item" data-v-06cc56f8="" data-v-f7e431f3=""><label class="block-header-item__label" data-v-f7e431f3=""><!----><div class="item-content-wrapper block-header-item__item" aria-haspopup="false" data-v-f7e431f3="" data-v-76d5a5f3="" data-qa="navigation-item-contact"><a class="item-content" target="" href="https://knighterrant.com/contact" data-v-76d5a5f3="" data-qa="navigationblock-page-contact">Contact</a><!----></div><!----></label></li><!--]--></ul></nav><!--]--><div class="block-header-layout-desktop__right-side" data-v-c1535ecd=""><!--[--><!--]--><!--[--><!--]--><!--[--><!--]--><!--[--><a href="https://knighterrant.com/" target="_blank" rel="nofollow" class="grid-button grid-button--primary block-header__button" aria-hidden="false" style="--border-radius:17px;--border-width:0px;--background-color:rgb(255,255,255);--font-color:rgb(0,0,0);--border-color:rgb(255,255,255);--background-color-hover:rgb(29,30,32);--font-color-hover:rgb(255,255,255);--border-color-hover:rgb(0,0,0);--m-height:0vw;--m-width:0vw;" data-element-ref="z2AIKy" data-v-06cc56f8="" data-v-297de5e8="">Search</a><!--]--></div></div><div class="block-header-layout-mobile block-header-layout-mobile--mobile-1" style="--v5c616aa5:min-content auto repeat(1, min-content);--v2e94a9f4:0px;" data-v-c1535ecd=""><!--[--><a class="block-header-logo block-header__logo" href="https://knighterrant.com/" data-v-06cc56f8="" style="--v6f401cb2:41px;--v5ef47fbb:41px;--b298f7c8:24px;--b1fe0892:24;--v6313685a:400;--v66b767ed:76.23369598388672px;--v56669be0:76px;--v00407601:24px;" data-v-2fe39434=""><img class="block-header-logo__image" src="/logo.png" alt="Knight Errant logo" data-v-2fe39434="" data-qa="builder-siteheader-img-logo"></a><!--]--><!--[--><!--]--><!--[--><button type="button" class="burger block-header__hamburger-menu" title="Menu" data-v-06cc56f8="" style="--v63017ab5:var(--nav-link-text-color);" data-v-43ca5418="" data-qa="builder-siteheader-btn-hamburger"><span class="burger__bun" data-v-43ca5418=""></span><span class="burger__meat" data-v-43ca5418=""></span><span class="burger__bun" data-v-43ca5418=""></span></button><!--]--><div class="block-header-layout-mobile__dropdown--link-align-right block-header-layout-mobile__dropdown" data-v-c1535ecd=""><!--[--><nav class="block-header__nav" data-v-06cc56f8=""><ul class="block-header__nav-links" data-v-06cc56f8="" data-qa="builder-siteheader-emptyspace"><!--[--><li class="block-header-item" data-v-06cc56f8="" data-v-f7e431f3=""><label class="block-header-item__label" data-v-f7e431f3=""><!----><div class="item-content-wrapper item-content-wrapper--active block-header-item__item" aria-haspopup="false" data-v-f7e431f3="" data-v-76d5a5f3="" data-qa="navigation-item-home"><a class="item-content" target="" href="https://knighterrant.com/" data-v-76d5a5f3="" data-qa="navigationblock-page-active-home">Home</a><!----></div><!----></label></li><li class="block-header-item" data-v-06cc56f8="" data-v-f7e431f3=""><label class="block-header-item__label" data-v-f7e431f3=""><!----><div class="item-content-wrapper block-header-item__item" aria-haspopup="false" data-v-f7e431f3="" data-v-76d5a5f3="" data-qa="navigation-item-services"><a class="item-content" target="" href="https://knighterrant.com/services" data-v-76d5a5f3="" data-qa="navigationblock-page-services">Services</a><!----></div><!----></label></li><li class="block-header-item" data-v-06cc56f8="" data-v-f7e431f3=""><label class="block-header-item__label" data-v-f7e431f3=""><!----><div class="item-content-wrapper block-header-item__item" aria-haspopup="false" data-v-f7e431f3="" data-v-76d5a5f3="" data-qa="navigation-item-about"><a class="item-content" target="" href="https://knighterrant.com/about" data-v-76d5a5f3="" data-qa="navigationblock-page-about">About</a><!----></div><!----></label></li><li class="block-header-item" data-v-06cc56f8="" data-v-f7e431f3=""><label class="block-header-item__label" data-v-f7e431f3=""><!----><div class="item-content-wrapper block-header-item__item" aria-haspopup="false" data-v-f7e431f3="" data-v-76d5a5f3="" data-qa="navigation-item-contact"><a class="item-content" target="" href="https://knighterrant.com/contact" data-v-76d5a5f3="" data-qa="navigationblock-page-contact">Contact</a><!----></div><!----></label></li><!--]--></ul></nav><!--]--><!--[--><!--]--><!--[--><!--]--><!--[--><a href="https://knighterrant.com/" target="_blank" rel="nofollow" class="grid-button grid-button--primary block-header__button" aria-hidden="false" style="--border-radius:17px;--border-width:0px;--background-color:rgb(255,255,255);--font-color:rgb(0,0,0);--border-color:rgb(255,255,255);--background-color-hover:rgb(29,30,32);--font-color-hover:rgb(255,255,255);--border-color-hover:rgb(0,0,0);--m-height:0vw;--m-width:0vw;" data-element-ref="z2AIKy" data-v-06cc56f8="" data-v-297de5e8="">Search</a><!--]--></div></div><!--]--></header></div>`
        }}
      />

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}