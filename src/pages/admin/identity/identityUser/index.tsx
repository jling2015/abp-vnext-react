import { PageContainer } from '@ant-design/pro-layout';
import { Button, Dropdown, Menu } from 'antd';
import React, { useRef, useState } from 'react';
import type { ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { IdentityUserDto } from './data';
import type { ProColumns } from '@ant-design/pro-table';
import { getUsers } from './service';
import { useLocalization } from 'umi';
import { CaretDownOutlined, PlusOutlined, SettingFilled } from '@ant-design/icons';
import CreateOrUpdateUser from './components/createOrUpdateUser';

const IdentityUser: React.FC = () => {
  const locale = useLocalization();
  const [selectedUser, setSelectedUser] = useState<IdentityUserDto>();
  const [visible, setVisible] = useState<boolean>(false);
  const tableActionRef = useRef<ActionType>();

  const createUser = async () => {
    await setSelectedUser(undefined);
    await setVisible(true);
  };
  const columns: ProColumns<IdentityUserDto>[] = [
    {
      title: locale('AbpIdentity::Actions'),
      width: 180,
      key: 'option',
      valueType: 'option',
      render: () => [
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item>{locale('AbpIdentity::Edit')}</Menu.Item>
              <Menu.Item>删除</Menu.Item>
            </Menu>
          }
          placement="bottomLeft"
        >
          <Button icon={<SettingFilled />} type="primary">
            {locale('AbpIdentity::Actions')}
            <CaretDownOutlined />
          </Button>
        </Dropdown>,
      ],
    },
    {
      title: locale('AbpIdentity::UserName'),
      key: 'userName',
      dataIndex: 'userName',
    },
    {
      title: locale('AbpIdentity::EmailAddress'),
      key: 'email',
      dataIndex: 'email',
    },
    {
      title: locale('AbpIdentity::PhoneNumber'),
      key: 'phoneNumber',
      dataIndex: 'phoneNumber',
    },
  ];
  return (
    <PageContainer
      extra={
        <Button icon={<PlusOutlined />} onClick={() => createUser()} type="primary">
          {locale('AbpIdentity::NewUser')}
        </Button>
      }
    >
      <ProTable<IdentityUserDto>
        columns={columns}
        request={async () => {
          const { items, totalCount } = await getUsers();
          return Promise.resolve({
            data: items,
            success: true,
            total: totalCount,
          });
        }}
      ></ProTable>
      <CreateOrUpdateUser
        identityUser={selectedUser}
        onFinish={() => tableActionRef.current?.reload()}
        visible={visible}
        onCancel={() => setVisible(false)}
      />
    </PageContainer>
  );
};

export default IdentityUser;
