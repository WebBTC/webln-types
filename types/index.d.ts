// Workaround for code completion to account for values this library doesn't know about yet.
// This allows TypeScript to understand that AdditionalString is a string that is distinct from the string literal type.
type AdditionalString = string & { _additionalString?: never };

type RequestMethod =
  | "getinfo"
  | "listchannels"
  | "listinvoices"
  | "channelbalance"
  | "walletbalance"
  | "openchannel"
  | "connectpeer"
  | "disconnectpeer"
  | "estimatefee"
  | "getchaninfo"
  | "getnetworkinfo"
  | "getnodeinfo"
  | "gettransactions"
  | "listpayments"
  | "listpeers"
  | "lookupinvoice"
  | "queryroutes"
  | "verifymessage"
  | "sendtoroute"
  | "decodepayreq"
  | "routermc"
  | "addinvoice"
  | AdditionalString;

interface WebLNNode {
  alias: string;
  pubkey: string;
  color?: string;
}
interface GetInfoResponse {
  node: WebLNNode;
  version: string;
  supports: ("lightning" | AdditionalString)[];
  methods: RequestMethod[];
}
interface SendPaymentResponse {
  preimage: string;
}
interface RequestInvoiceArgs {
  amount?: string | number;
  defaultAmount?: string | number;
  minimumAmount?: string | number;
  maximumAmount?: string | number;
  defaultMemo?: string;
}
interface KeysendArgs {
  destination: string;
  customRecords?: Record<string, string>;
  amount: string | number;
}
interface RequestInvoiceResponse {
  paymentRequest: string;
}
interface SignMessageResponse {
  message: string;
  signature: string;
}
interface WebLNProvider {
  enable(): Promise<{ enabled: boolean; remember: boolean }>;
  getInfo(): Promise<GetInfoResponse>;
  sendPayment(paymentRequest: string): Promise<SendPaymentResponse>;
  keysend(args: KeysendArgs): Promise<SendPaymentResponse>;
  makeInvoice(
    args: string | number | RequestInvoiceArgs
  ): Promise<RequestInvoiceResponse>;
  signMessage(message: string): Promise<SignMessageResponse>;
  verifyMessage(signature: string, message: string): Promise<void>;
  request(method: RequestMethod, args?: unknown): Promise<unknown>;
}

declare global {
  interface Window {
    webln?: WebLNProvider;
  }
}

export {
  WebLNProvider,
  RequestMethod,
  WebLNNode,
  GetInfoResponse,
  SendPaymentResponse,
  RequestInvoiceArgs,
  KeysendArgs,
  RequestInvoiceResponse,
  SignMessageResponse,
};
