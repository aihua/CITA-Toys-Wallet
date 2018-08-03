/*
 * @Author: Keith-CY
 * @Date: 2018-07-22 19:59:22
 * @Last Modified by: Keith-CY
 * @Last Modified time: 2018-08-02 12:08:25
 */

import { IBlock, IBlockHeader, Transaction, Metadata, ABI } from './typings'
import { PanelConfigs } from './config/localstorage'
import widerThan from './utils/widerThan'
import { Contract, AccountType } from './typings/account'
import { LocalAccount } from './components/LocalAccounts'

import { SelectorType } from './components/TableWithSelector'

const isDesktop = widerThan(800)
export const initHeader: IBlockHeader = {
  timestamp: '',
  prevHash: '',
  number: '',
  stateRoot: '',
  transactionsRoot: '',
  receiptsRoot: '',
  gasUsed: '',
  proof: {
    Tendermint: {
      proposal: ''
    }
  }
}
export const initBlock: IBlock = {
  body: {
    transactions: []
  },
  hash: '',
  header: initHeader,
  version: 0
}

export const initTransaction: Transaction = {
  hash: '',
  timestamp: '',
  content: '',
  basicInfo: {
    from: '',
    to: '',
    value: '',
    data: ''
  }
}
export const initMetadata: Metadata = {
  chainId: -1,
  chainName: '',
  operator: '',
  website: '',
  genesisTimestamp: '',
  validators: [],
  blockInterval: 0
}

// init config values
export const initPanelConfigs: PanelConfigs = {
  logo: 'www.demo.com',
  TPS: true,
  blockHeight: true,
  blockHash: true,
  blockAge: isDesktop,
  blockTransactions: true,
  blockGasUsed: isDesktop,
  blockPageSize: 10,
  transactionHash: true,
  transactionFrom: isDesktop,
  transactionTo: isDesktop,
  transactionValue: isDesktop,
  transactionAge: isDesktop,
  transactionGasUsed: isDesktop,
  transactionBlockNumber: true,
  transactionPageSize: 10,
  graphIPB: true,
  graphTPB: true,
  graphGasUsedBlock: true,
  graphGasUsedTx: true,
  graphProposals: true,
  graphMaxCount: 100
}

export const initServerList = (process.env.CHAIN_SERVERS || '').split(',')
export const initPrivateKeyList = []
export const initError = { message: '', code: '' }
export const initAccountState = {
  loading: 0,
  type: AccountType.NORMAL,
  addr: '',
  abi: [] as ABI,
  contract: { _jsonInterface: [], methods: [] } as Contract,
  balance: '',
  txCount: '',
  creator: '',
  transactions: [] as Transaction[],
  customToken: {
    name: ''
  },

  normals: [] as LocalAccount[],
  erc20s: [] as LocalAccount[],
  erc721s: [] as LocalAccount[],
  panelOn: false,
  addrsOn: false,
  normalsAdd: {
    name: '',
    addr: ''
  },
  erc20sAdd: {
    name: '',
    addr: ''
  },
  erc721sAdd: {
    name: '',
    addr: ''
  },
  error: {
    code: '',
    message: ''
  }
}

export const initBlockState = {
  loading: 0,
  hash: '',
  header: {
    timestamp: '',
    prevHash: '',
    number: '',
    stateRoot: '',
    transactionsRoot: '',
    receiptsRoot: '',
    gasUsed: '',
    proof: {
      Tendermint: {
        proposal: ''
      }
    }
  },
  body: {
    transactions: []
  },
  version: 0,
  transactionsOn: false,
  error: initError
}

export const initBlockTableState = {
  headers: [
    { key: 'height', text: 'height', href: '/height/' },
    { key: 'hash', text: 'hash', href: '/block/' },
    { key: 'age', text: 'age' },
    { key: 'transactions', text: 'transactions' },
    { key: 'gasUsed', text: 'gas used' }
  ],
  items: [] as any[],
  count: 0,
  pageSize: 10,
  pageNo: 0,
  selectors: [
    {
      type: SelectorType.RANGE,
      key: 'number',
      text: 'number selector',
      items: [{ key: 'numberFrom', text: 'NumberFrom' }, { key: 'numberTo', text: 'NumberTo' }]
    },
    {
      type: SelectorType.RANGE,
      key: 'transaction',
      text: 'transactions selector',
      items: [{ key: 'transactionFrom', text: 'transactionFrom' }, { key: 'transactionTo', text: 'transactionTo' }]
    }
  ],
  selectorsValue: {
    numberFrom: '',
    numberTo: '',
    transactionFrom: '',
    transactionTo: ''
  },
  loading: 0,
  error: {
    code: '',
    message: ''
  }
}
