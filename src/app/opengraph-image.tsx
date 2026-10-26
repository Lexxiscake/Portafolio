import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Luka Torres — Ingeniería en Sistemas';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          background: '#0a0a0a',
          color: '#f2f0eb',
          padding: '60px 64px',
          fontFamily: 'sans-serif',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '310px',
            height: '100%',
            display: 'flex',
            background: '#e60012',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: '270px',
            width: '40px',
            height: '100%',
            display: 'flex',
            background: '#f2f0eb',
            transform: 'skewX(-10deg)',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '52px',
                height: '52px',
                background: '#e60012',
                color: '#0a0a0a',
                fontSize: '24px',
                fontWeight: 900,
              }}
            >
              LT
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: '18px',
                letterSpacing: '0.16em',
                fontWeight: 700,
                color: '#a8a49a',
              }}
            >
              LUKA TORRES / PORTAFOLIO
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '820px' }}>
            <div
              style={{
                display: 'flex',
                fontSize: '20px',
                letterSpacing: '0.2em',
                fontWeight: 700,
                color: '#e60012',
                marginBottom: '14px',
              }}
            >
              TIJUANA · MÉXICO
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: '92px',
                fontWeight: 900,
                lineHeight: 0.92,
                letterSpacing: '-0.055em',
              }}
            >
              LUKA TORRES
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
              <div
                style={{
                  display: 'flex',
                  background: '#e60012',
                  color: '#0a0a0a',
                  fontSize: '38px',
                  fontWeight: 900,
                  letterSpacing: '-0.03em',
                  padding: '0 14px',
                }}
              >
                INGENIERÍA EN SISTEMAS
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              borderTop: '2px solid #3a3a3a',
              paddingTop: '18px',
              maxWidth: '820px',
              fontSize: '16px',
              letterSpacing: '0.1em',
              color: '#a8a49a',
            }}
          >
            <div style={{ display: 'flex' }}>
              TIJUANA, MX · 2026
            </div>
            <div style={{ display: 'flex', color: '#7CFFB2' }}>
              github.com/Lexxiscake
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
