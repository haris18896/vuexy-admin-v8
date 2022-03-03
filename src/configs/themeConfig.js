// You can customize the template with the help of this file

//Template config options
const themeConfig = {
  app: {
    appName: 'FriendsVPN',
    appLogoImageDark: require('@src/assets/images/logo/FriendsVPN.svg').default,
    appLogoImageLight: require('@src/assets/images/logo/FriendsVPNWhite.svg').default,
    appLogoImage01: require('@src/assets/images/logo/FriendsVPN1.svg').default,
    appLogoImage02: require('@src/assets/images/logo/FriendsVPN2.svg').default,
  },
  layout: {
    isRTL: false,
    skin: 'light', // light, dark, bordered, semi-dark
    routerTransition: 'fadeIn', // fadeIn, fadeInLeft, zoomIn, none or check this for more transition https://animate.style/
    type: 'vertical', // vertical, horizontal
    contentWidth: 'full', // full, boxed
    menu: {
      isHidden: false,
      isCollapsed: false,
    },
    navbar: {
      // ? For horizontal menu, navbar type will work for navMenu type
      type: 'floating', // static , sticky , floating, hidden
      backgroundColor: 'white', // BS color options [primary, success, etc]
    },
    footer: {
      type: 'hidden', // static, sticky, hidden
    },
    customizer: false,
    scrollTop: true, // Enable scroll to top button
  },
}

export default themeConfig
