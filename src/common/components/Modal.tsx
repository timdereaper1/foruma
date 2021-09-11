import React from 'react';
import styled from 'styled-components';

interface ModalProps {
	active: boolean;
	onClose(): void;
}

export default function Modal({ active, onClose, children }: React.PropsWithChildren<ModalProps>) {
	return !active ? null : <ModalWrapper>{children}</ModalWrapper>;
}

const ModalWrapper = styled.div``;
