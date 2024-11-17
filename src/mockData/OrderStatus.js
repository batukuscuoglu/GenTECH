const orderStatusData = [
    {
      orderId: 1,
      itemName: 'iPhone 14 Pro',
      imgSrc: '/src/assets/Apple-iPhone-14-Pro-Max,-5G,-128GB,-Space-Black.jfif', 
      quantity: 1,
      price: 999,
      status: 'Processing',
      shippingAddress: '123 Main Street, New York, NY, 10001, USA',
      estimatedDelivery: 'November 20, 2024',
      stages: [
        { name: 'Processing' },
        { name: 'Shipped' },
        { name: 'Delivered' },
      ],
    },
    {
      orderId: 2,
      itemName: 'MacBook Air M2',
      imgSrc: '/src/assets/1-jpeg-82ff66f9-3112-4142-a1ec-9515781ecbf9.webp', 
      quantity: 1,
      price: 1199,
      status: 'Shipped',
      shippingAddress: '456 Elm Avenue, Los Angeles, CA, 90001, USA',
      estimatedDelivery: 'November 21, 2024',
      stages: [
        { name: 'Processing' },
        { name: 'Shipped' },
        { name: 'Delivered' },
      ],
    },
    {
      orderId: 3,
      itemName: 'AirPods Max',
      imgSrc: '/src/assets/apple_mgyl3am_a_airpods_max_sky_blue_1610236.jpg',
      quantity: 2,
      price: 399,
      status: 'Delivered',
      shippingAddress: '789 Maple Lane, Chicago, IL, 60601, USA',
      estimatedDelivery: 'November 18, 2024',
      stages: [
        { name: 'Processing' },
        { name: 'Shipped' },
        { name: 'Delivered' },
      ],
    },
  ];
  
  export default orderStatusData;
  