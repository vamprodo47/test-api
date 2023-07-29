# test-api

## Getting Started

### Description

This is a deposit and withdrawal API.

### Installation

```bash
$ npm install
```

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## DB Schema

### Wallet Model

- id: string (해당 지갑의 주소, uuid)
- balance: number (해당 지갑의 잔고)

### Transfer Model

- id: number (auto increment)
- walletId: string (해당 지갑의 주소, uuid)
- type: string (입금 또는 출금)
- amount: number (입출금 요청 수량)
- status: string (처리중 또는 처리됨)

## API

### 1. Register Wallet

#### Request

`POST /wallets`

#### Required Body

```
{
  balance: number
}
```

#### Response

```
{
  id: string (지갑 주소, uuid),
  balance: number
}
```

### 2. Register Wallet

#### Request

`POST /transfers/wallet/:walletId`

#### Required Body

```
  walletId: string (uuid)
```

```
{
  type: string (입금 또는 출금),
  amount: number (입출금 요청 수량)
}
```

#### Response

```
{
  walletId: string (uuid),
  type: string (입금 또는 출금),
  amount: number (입출금 요청 수량),
  status: string (처리중),
  id: number (auto increment)
}
```

### 3. Patch Transfers

#### Request

`PATCH /transfers`

#### Required Body

```

```

#### Response

```
{
  walletId: string (uuid),
  type: string (입금 또는 출금),
  amount: number (입출금 요청 수량),
  status: string (처리중),
  id: number (auto increment)
}
```

### 4. Get Balance

#### Request

`GET /wallets/:id/balance`

#### Required Body

```
  id: string (지갑 주소, uuid)
```

#### Response

```
{
  id: string (지갑 주소, uuid),
  balance: number (지갑 잔고)
}
```

### 5. Find Transfers By Id

#### Request

`GET /transfers/wallet/:walletId`

#### Param

```
  walletId: string (지갑 주소, uuid)
```

#### Query

```
  offset: number (시작 개체 인덱스),
  maxCount: number (최대 개체 수)
```

#### Response

```
[
    {
      walletId: string (uuid),
      type: string (입금 또는 출금),
      amount: number (입출금 요청 수량),
      status: string (처리됨),
      id: number (auto increment)
    },
    {...},
    ...
]
```
