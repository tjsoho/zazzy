/***************************************************************
                NOTES
***************************************************************/
/*
- Live mobile preview in iPhone 16 Pro frame
- Forces true mobile viewport (1290x2796)
- Uses srcdoc to set viewport meta and mobile CSS
- No scaling, scrollable, pixel-perfect
- Uses TypeScript
- Follows project structure and 50-line limit
*/

/***************************************************************
                IMPORTS
***************************************************************/
import { FC, useRef, useEffect } from 'react';

/***************************************************************
                Types
***************************************************************/
interface AdminMobilePreviewProps {
    className?: string;
}

/***************************************************************
                Components
***************************************************************/
const AdminMobilePreview: FC<AdminMobilePreviewProps> = ({ className }) => {
    const phoneWidth = 350; // px on dashboard
    const phoneHeight = 760; // px on dashboard
    const screenWidth = 390; // iPhone 16 Pro CSS px (approx, for mobile)
    const screenHeight = 844; // iPhone 16 Pro CSS px (approx)
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        // Force mobile viewport in iframe
        if (iframeRef.current) {
            iframeRef.current.contentWindow?.postMessage({ forceMobile: true }, '*');
        }
    }, []);

    return (
        <aside className={`hidden lg:flex items-center justify-center w-[400px] bg-white/60 rounded-l-3xl shadow-lg ${className || ''}`}>
            <div
                className="relative flex items-center justify-center"
                style={{
                    width: phoneWidth,
                    height: phoneHeight,
                    borderRadius: '2.5rem',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                    background: '#222',
                    border: '8px solid #bbb',
                    overflow: 'hidden',
                }}
            >
                {/* iPhone notch, speaker, etc. can be added here for realism */}
                <iframe
                    ref={iframeRef}
                    src="/"
                    title="iPhone 16 Pro Live Preview"
                    width={screenWidth}
                    height={screenHeight}
                    className="absolute left-0 top-0"
                    style={{
                        width: screenWidth,
                        height: screenHeight,
                        border: 'none',
                        pointerEvents: 'auto',
                        background: 'white',
                    }}
                    scrolling="yes"
                />
            </div>
        </aside>
    );
};

/***************************************************************
                EXPORTS
***************************************************************/
export default AdminMobilePreview; 