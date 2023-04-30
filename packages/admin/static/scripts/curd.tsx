import * as React from 'react'
import { render } from './components/utils'
import { useTable } from '@refinedev/antd'
import { Refine } from '@refinedev/core'
import { Table } from 'antd'
import dataProvider, { GraphQLClient } from "@refinedev/hasura";
const API_URL = process.env.HASURA_PROJECT_ENDPOINT || "https://wapi.weichangan.cn/v1/graphql";
const client = new GraphQLClient(API_URL, {
  headers: {
    "x-hasura-role": "admin",
    "x-hasura-admin-secret": "sg123qwe"
  },
});
export const Curd = () => {
  const { tableProps } = useTable({
    resource: 'accounts'
  })
  const gqlDataProvider = dataProvider(client);
  return <Refine dataProvider={gqlDataProvider}>
    <Table {...tableProps} />
  </Refine>
}
render(<Curd />)