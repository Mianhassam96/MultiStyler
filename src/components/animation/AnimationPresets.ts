export const animationPresets = {
  bounce: [
    { position: 0, properties: { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0.8,0,1,1)' } },
    { position: 50, properties: { transform: 'translateY(-25px)', animationTimingFunction: 'cubic-bezier(0,0,0.2,1)' } },
    { position: 100, properties: { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0.8,0,1,1)' } }
  ],
  pulse: [
    { position: 0, properties: { transform: 'scale(1)', opacity: '1' } },
    { position: 50, properties: { transform: 'scale(1.1)', opacity: '0.7' } },
    { position: 100, properties: { transform: 'scale(1)', opacity: '1' } }
  ],
  shake: [
    { position: 0, properties: { transform: 'translateX(0)' } },
    { position: 25, properties: { transform: 'translateX(-10px)' } },
    { position: 50, properties: { transform: 'translateX(10px)' } },
    { position: 75, properties: { transform: 'translateX(-10px)' } },
    { position: 100, properties: { transform: 'translateX(0)' } }
  ],
  flip: [
    { position: 0, properties: { transform: 'perspective(400px) rotateY(0)', animationTimingFunction: 'ease-out' } },
    { position: 40, properties: { transform: 'perspective(400px) translateZ(150px) rotateY(170deg)', animationTimingFunction: 'ease-out' } },
    { position: 50, properties: { transform: 'perspective(400px) translateZ(150px) rotateY(190deg)', animationTimingFunction: 'ease-in' } },
    { position: 80, properties: { transform: 'perspective(400px) translateZ(0) rotateY(360deg)', animationTimingFunction: 'ease-in' } },
    { position: 100, properties: { transform: 'perspective(400px) rotateY(360deg)', animationTimingFunction: 'ease-in' } }
  ],
  jello: [
    { position: 0, properties: { transform: 'scale3d(1, 1, 1)' } },
    { position: 30, properties: { transform: 'scale3d(1.25, 0.75, 1)' } },
    { position: 40, properties: { transform: 'scale3d(0.75, 1.25, 1)' } },
    { position: 50, properties: { transform: 'scale3d(1.15, 0.85, 1)' } },
    { position: 65, properties: { transform: 'scale3d(0.95, 1.05, 1)' } },
    { position: 75, properties: { transform: 'scale3d(1.05, 0.95, 1)' } },
    { position: 100, properties: { transform: 'scale3d(1, 1, 1)' } }
  ],
  swing: [
    { position: 0, properties: { transform: 'rotate3d(0, 0, 1, 0deg)' } },
    { position: 20, properties: { transform: 'rotate3d(0, 0, 1, 15deg)' } },
    { position: 40, properties: { transform: 'rotate3d(0, 0, 1, -10deg)' } },
    { position: 60, properties: { transform: 'rotate3d(0, 0, 1, 5deg)' } },
    { position: 80, properties: { transform: 'rotate3d(0, 0, 1, -5deg)' } },
    { position: 100, properties: { transform: 'rotate3d(0, 0, 1, 0deg)' } }
  ]
};