export const carouselBanner = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 4000,
};

export const carouselCard = {
  infinite: false,
  speed: 500,
  initialSlide: 0,
  slidesToShow: 6,
  slidesToScroll: 6,
  arrows: true,
  responsive: [
    {
      breakpoint: 1300,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 6,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export const carouselTopSellBuy = {
  infinite: false,
  speed: 500,
  initialSlide: 0,
  slidesToShow: 5,
  slidesToScroll: 5,
  arrows: false,
  rows: 2,
  responsive: [
    {
      breakpoint: 1300,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1.5,
        slidesToScroll: 1.5,
      },
    },
  ],
};

export const dataTopSelBuy = [
  {
    avatar:
      'https://images.rarible.com/?fit=outsize&n=-1&url=https%3A%2F%2Fipfs.rarible.com%2Fipfs%2FQmfXkd1Zy7EF35g4SU65NpnP5sHfV7jeEbY2d52sY4eVU9',
    name: 'Relax Pepe',
    amount: '105.9 Mochi',
  },
  {
    avatar:
      'https://images.rarible.com/?fit=outsize&n=-1&url=https%3A%2F%2Fipfs.rarible.com%2Fipfs%2FQmRMy4d5FUWDLRGxrijY4kkwrXSmtaaTRkCzhYzLws7BaR&w=100',
    name: 'LIRONA ',
    amount: '12.5 Mochi',
  },
  {
    avatar:
      'https://api.rarible.com/protocol/content/v1/ipfs/QmNreXwqP4CeJPFnttfHkh8Yp4ug4Fg4Q9WZ9gxQWGWFmG/w100_cover.webp?v=1',
    name: 'CryptoSnake ',
    amount: '9.446 Mochi',
  },
  {
    avatar:
      'https://api.rarible.com/protocol/content/v1/ipfs/QmYPDPSG3CHw2wqkCpW9PtDJYaiaPVFc9RKmZHN1rsTszQ/w100_cover.webp?v=1',
    name: 'Rulton Fyder ',
    amount: '9.25 Mochi',
  },
  {
    avatar:
      'https://api.rarible.com/protocol/content/v1/ipfs/QmXTRQhZVBXFoMLRgJhhw7CyPHBXUDGCW2pKo62Bnq38QD/w100_cover.webp?v=1',
    name: 'Frenetik Void ',
    amount: '7.8 Mochi',
  },
  {
    avatar:
      'https://api.rarible.com/protocol/content/v1/ipfs/QmR67rrdephYWCALT2U439jAeShoYY6EaLYBugLRsLHhya/w100_cover.webp?v=1',
    name: 'Monstero ',
    amount: '6.38 Mochi',
  },
  {
    avatar:
      'https://api.rarible.com/protocol/content/v1/ipfs/QmUiSoJ9fDshgHMUV4rmMExzNKk7zTrim4JSihgbTkf16E/w100_cover.webp?v=1',
    name: 'Thomas Pomarelle ',
    amount: '5.25 Mochi',
  },
  {
    avatar:
      'https://api.rarible.com/protocol/content/v1/ipfs/QmXSXHaAHL7oEjvgwbpMVuv4mJBfeE9UXadR9wnSwVnNsh/w100_cover.webp?v=1',
    name: 'raidzer0',
    amount: '5.07 Mochi',
  },
  {
    avatar:
      'https://api.rarible.com/protocol/content/v1/ipfs/QmRFVhGMx3Wrf2W4RcRW4GRceVdK198k3CT3vfV3jUgJp7/w100_cover.webp?v=1',
    name: 'Redlioneye Gazette',
    amount: '4.9 Mochi',
  },
  {
    avatar:
      'https://api.rarible.com/protocol/content/v1/ipfs/QmQmgemcWUugoBK7h3iJhnAoKUBvH9WeEauEKpxPCwxbnu/w100_cover.webp?v=1',
    name: 'ElementBlocks',
    amount: '4.8 Mochi',
  },
];
