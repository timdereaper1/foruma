import React from 'react';
import { ModalWrapper } from './styles';

interface ModalProps {
	active: boolean;
	onClose(): void;
}

export default function Modal({ active, onClose, children }: React.PropsWithChildren<ModalProps>) {
	return !active ? null : <ModalWrapper>{children}</ModalWrapper>;
}
