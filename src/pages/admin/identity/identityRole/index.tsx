import { PageContainer } from '@ant-design/pro-layout';
import { Button, Dropdown, Menu } from 'antd';
import React from 'react';
import ProTable from '@ant-design/pro-table';
import { IdentityRoleDto } from './data';
import type { ProColumns } from '@ant-design/pro-table';
import { getRoles } from './service';
import { CaretDownOutlined, PlusOutlined, SettingFilled } from '@ant-design/icons';
import { useLocalization } from 'umi';

interface IdentityRoleProps {

}


const IdentityRole: React.FC<IdentityRoleProps> = ({ }) => {
  const locale= useLocalization();

  const columns: ProColumns<IdentityRoleDto>[] = [
    {
      title: locale("AbpIdentity::Actions") ,
      width: 180,
      key: 'option',
      valueType: 'option',
      render: () => [
      <Dropdown overlay={
        <Menu>
          <Menu.Item>
            编辑
          </Menu.Item>
          <Menu.Item>
            声明
          </Menu.Item>
          <Menu.Item>
            权限
          </Menu.Item>
          <Menu.Item>
            删除
          </Menu.Item>
        </Menu>
      }
      placement="bottomLeft">
        <Button icon={<SettingFilled />} type="primary">{ locale("AbpIdentity::Actions")}<CaretDownOutlined /></Button>
      </Dropdown>,
      ],
    },
    {
      title: locale("AbpIdentity::RoleName"),
      key: 'name',
      dataIndex: 'name'
    }
  ]
  return (
    <PageContainer
      extra={<Button icon={<PlusOutlined />} type="primary">{locale("AbpIdentity::NewRole")}</Button>}>
      <ProTable<IdentityRoleDto>
        columns={columns}
        request={async (params, sorter, filter) => {
          const {items, totalCount} = await getRoles()
          return Promise.resolve({
            data:items,
            success: true,
            total:totalCount
          });
        }}
      >

      </ProTable>
    </PageContainer>
  )
}

export default IdentityRole;
