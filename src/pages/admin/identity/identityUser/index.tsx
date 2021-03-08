import { PageContainer } from '@ant-design/pro-layout';
import { Button, Dropdown, Menu } from 'antd';
import React from 'react';
import ProTable from '@ant-design/pro-table';
import { IdentityUserDto } from './data';
import type { ProColumns } from '@ant-design/pro-table';
import { getUsers } from './service';
import { useLocalization } from 'umi'
import { CaretDownOutlined, PlusOutlined, SettingFilled } from '@ant-design/icons';

interface IdentityUserProps {

}


const IdentityUser: React.FC<IdentityUserProps> = ({ }) => {

  const locale= useLocalization();
  const columns: ProColumns<IdentityUserDto>[] = [
    {
      title: locale("AbpIdentity::Actions"),
      width: 180,
      key: 'option',
      valueType: 'option',
      render: () => [
      <Dropdown overlay={
        <Menu>
          <Menu.Item>
          {locale("AbpIdentity::Edit")}
          </Menu.Item>
          <Menu.Item>
            声明
          </Menu.Item>
          <Menu.Item>
            锁定
          </Menu.Item>
          <Menu.Item>
            权限
          </Menu.Item>
          <Menu.Item>
            设置密码
          </Menu.Item>
          <Menu.Item>
            双因素验证
          </Menu.Item>
          <Menu.Item>
            删除
          </Menu.Item>
        </Menu>
      }
      placement="bottomLeft">
        <Button icon={<SettingFilled />} type="primary">{locale("AbpIdentity::Actions")}<CaretDownOutlined /></Button>
      </Dropdown>,
      ],
    },
    {
      title: locale("AbpIdentity::UserName"),
      key: 'userName',
      dataIndex: 'userName'
    },
    {
      title: locale("AbpIdentity::EmailAddress"),
      key: 'email',
      dataIndex: 'email'
    },
    {
      title: locale("AbpIdentity::PhoneNumber"),
      key: 'phoneNumber',
      dataIndex: 'phoneNumber'
    }
  ]
  return (
    <PageContainer
      extra={<Button icon={<PlusOutlined />} type="primary">{locale("AbpIdentity::NewUser")}</Button>}>
      <ProTable<IdentityUserDto>
        columns={columns}
        request={async (params, sorter, filter) => {
          const {items, totalCount} = await getUsers()
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

export default IdentityUser;
