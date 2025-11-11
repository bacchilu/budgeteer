import {Modal as BootstrapModal} from 'bootstrap';
import React from 'react';
import {createPortal} from 'react-dom';

export const Modal: React.FC<{open: boolean; onClose: () => void; children: React.ReactNode}> = function ({
    open,
    onClose,
    children,
}) {
    const modalId = React.useId();
    const modalRef = React.useRef<BootstrapModal | null>(null);
    const onCloseRef = React.useRef(onClose);
    React.useEffect(() => {
        onCloseRef.current = onClose;
    }, [onClose]);
    React.useEffect(() => {
        const el = document.getElementById(modalId)!;
        modalRef.current = new BootstrapModal(el, {backdrop: true, focus: true});
        el.addEventListener('hidden.bs.modal', onCloseRef.current);

        return () => {
            el.removeEventListener('hidden.bs.modal', onCloseRef.current);
            modalRef.current!.dispose();
        };
    }, [modalId]);
    React.useEffect(() => {
        if (open) modalRef.current!.show();
        else modalRef.current!.hide();
    }, [open]);

    return createPortal(
        <div className="modal fade" id={modalId}>
            <div className="modal-dialog">
                <div className="modal-content">{children}</div>
            </div>
        </div>,
        document.body
    );
};
