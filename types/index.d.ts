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

type ListPeersResponse = {
  peers: {
    pub_key: string;
    address: string;
    bytes_sent: string;
    bytes_recv: string;
    sat_sent: string;
    sat_recv: string;
    inbound: boolean;
    ping_time: string;
    sync_type: string;
    features: Record<string, unknown>;
    errors: [];
    flap_count: number;
    last_flap_ns: string;
    last_ping_payload: string;
  }[];
};

type ListPeersRequestFunc = (method: "listpeers") => ListPeersResponse;

type ListChannelsResponse = {
  channels: {
    active: boolean;
    remote_pubkey: string;
    channel_point: string;
    chan_id: string;
    capacity: string;
    local_balance: string;
    remote_balance: string;
    commit_fee: string;
    commit_weight: string;
    fee_per_kw: string;
    unsettled_balance: string;
    total_satoshis_sent: string;
    total_satoshis_received: string;
    num_updates: string;
    pending_htlcs: unknown[];
    csv_delay: number;
    private: boolean;
    initiator: boolean;
    chan_status_flags: string;
    local_chan_reserve_sat: string;
    remote_chan_reserve_sat: string;
    static_remote_key: boolean;
    commitment_type: string;
    lifetime: string;
    uptime: string;
    close_address: string;
    push_amount_sat: string;
    thaw_height: number;
    local_constraints: {
      csv_delay: number;
      chan_reserve_sat: string;
      dust_limit_sat: string;
      max_pending_amt_msat: string;
      min_htlc_msat: string;
      max_accepted_htlcs: number;
    };
    remote_constraints: {
      csv_delay: number;
      chan_reserve_sat: string;
      dust_limit_sat: string;
      max_pending_amt_msat: string;
      min_htlc_msat: string;
      max_accepted_htlcs: number;
    };
    alias_scids: unknown[];
    zero_conf: false;
    zero_conf_confirmed_scid: string;
    peer_alias: string;
  }[];
};

type ListChannelsRequestFunc = (method: "listchannels") => ListPeersResponse;

type ListInvoicesResponse = {
  invoices: {
    memo: string;
    r_preimage: string;
    r_hash: string;
    value: string;
    value_msat: string;
    settled: boolean;
    creation_date: string;
    settle_date: string;
    payment_request: string;
    description_hash: string;
    expiry: string;
    fallback_addr: string;
    cltv_expiry: string;
    route_hints: unknown;
    private: boolean;
    add_index: string;
    settle_index: string;
    amt_paid: string;
    amt_paid_sat: string;
    amt_paid_msat: string;
    state: "SETTLED" | "CANCELED" | string;
    is_keysend: boolean;
    payment_addr: string;
    is_amp: false;
    amp_invoice_state: {};
    htlcs: {
      chan_id: string;
      htlc_index: string;
      amt_msat: string;
      accept_height: number;
      accept_time: string;
      resolve_time: string;
      expiry_height: number;
      state: "SETTLED" | "CANCELED" | string;
      custom_records: { [key: string]: string };
      mpp_total_amt_msat: string;
      amp: unknown;
    }[];
    features: { [key: string]: unknown };
  }[];
  last_index_offset: string;
  first_index_offset: string;
};

type ListInvoicesRequestFunc = (
  method: "listinvoices",
  args?: {
    reversed?: boolean;
    num_max_invoices?: number;
    index_offset?: number;
    pending_only?: boolean;
    creation_date_start?: number;
    creation_date_end?: number;
  }
) => ListInvoicesResponse;

type ListPaymentsResponse = {
  payments: {
    payment_hash: string;
    value: string;
    creation_date: string;
    fee: string;
    payment_preimage: string;
    value_sat: string;
    value_msat: string;
    payment_request: string;
    status: string;
    fee_sat: string;
    fee_msat: string;
    creation_time_ns: string;
    htlcs: unknown[]; // TODO: add htlc type
    payment_index: string;
    failure_reason: string;
  }[];
  last_index_offset: string;
  first_index_offset: string;
  total_num_payments: string;
};

type ListPaymentsRequestFunc = (
  method: "listpayments",
  args?: {
    reversed?: boolean;
    num_max_invoices?: number;
    index_offset?: number;
    pending_only?: boolean;
    creation_date_start?: number;
    creation_date_end?: number;
  }
) => ListInvoicesResponse;

type LNURLResponse =
  | {
      status: "OK";
    }
  | { status: "ERROR"; reason: string };

type WalletBalanceResponse = {
  total_balance: string;
  confirmed_balance: string;
  unconfirmed_balance: string;
  locked_balance: string;
  reserved_balance_anchor_chan: string;
  account_balance: {
    default: {
      confirmed_balance: string;
      unconfirmed_balance: string;
    };
  };
};

type WalletBalanceRequestFunc = (
  method: "walletbalance"
) => WalletBalanceResponse;

interface WebLNProvider {
  enable(): Promise<void>; // Promise<{ enabled: boolean; remember: boolean }>
  getInfo(): Promise<GetInfoResponse>;
  keysend(args: KeysendArgs): Promise<SendPaymentResponse>;
  lnurl(lnurl: string): Promise<LNURLResponse>;
  makeInvoice(
    args: string | number | RequestInvoiceArgs
  ): Promise<RequestInvoiceResponse>;
  request: ListPeersRequestFunc &
    ListChannelsRequestFunc &
    ListInvoicesRequestFunc &
    ListPaymentsRequestFunc &
    WalletBalanceRequestFunc &
    ((method: RequestMethod, args?: unknown) => Promise<unknown>);
  sendPayment(paymentRequest: string): Promise<SendPaymentResponse>;
  signMessage(message: string): Promise<SignMessageResponse>;
  verifyMessage(signature: string, message: string): Promise<void>;
  on?(eventName: string, listener: () => void): void;
  off?(eventName: string, listener: () => void): void;
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
  ListPeersResponse,
  ListChannelsResponse,
  WalletBalanceResponse,
  ListInvoicesResponse,
  ListPaymentsResponse,
};
