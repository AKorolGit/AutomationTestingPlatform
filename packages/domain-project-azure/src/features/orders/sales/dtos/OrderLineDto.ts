interface BaseOrderLine {
  id: string;
  lineNumber: number;
}

export interface CertificateLine extends BaseOrderLine {
  type: 'certificate';
  certificateId: string;
  volume: number;
}

export interface ServiceLine extends BaseOrderLine {
  type: 'service';
  serviceCode: string;
}

export type OrderLine = CertificateLine | ServiceLine;