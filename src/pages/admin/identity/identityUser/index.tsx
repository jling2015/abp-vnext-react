import { PageContainer } from '@ant-design/pro-layout';
import { Button, Dropdown, Menu } from 'antd';
import React, { useRef, useState } from 'react';
import type { ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { IdentityUserDto } from './data';
import type { ProColumns } from '@ant-design/pro-table';
import { deleteUser, getUsers } from './service';
import { useLocalization } from 'umi';
import { CaretDownOutlined, PlusOutlined, SettingFilled } from '@ant-design/icons';
import CreateOrUpdateUser from './components/createOrUpdateUser';
import { getRoles } from '../identityRole/service';
import type { IdentityRoleDto } from './../identityRole/data.d';

const IdentityUser: React.FC = () => {
  const locale = useLocalization();
  const [selectedUser, setSelectedUser] = useState<IdentityUserDto>();
  const [checkBoxRoles, setCheckBoxRoles] = useState<IdentityRoleDto[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const tableActionRef = useRef<ActionType>();
  const getRolesForCheckBox = async () => {
    const result = await getRoles();
    await setCheckBoxRoles(result.items!);
  };

  const createUser = async () => {
    await getRolesForCheckBox();
    await setSelectedUser(undefined);
    await setVisible(true);
  };

  const updateUser = async (record: IdentityUserDto) => {
    await getRolesForCheckBox();
    await setSelectedUser(record);
    await setVisible(true);
  };

  const handleDeleteUser = async (id: string) => {
    await deleteUser(id);
    tableActionRef.current?.reload();
  };
  const columns: ProColumns<IdentityUserDto>[] = [
    {
      title: locale('AbpIdentity::Actions'),
      width: 180,
      key: 'option',
      valueType: 'option',
      render: (_, record) => [
        <Dropdown
          key="dropdown"
          overlay={
            <Menu>
              <Menu.Item key="edit" onClick={() => updateUser(record)}>
                {locale('AbpIdentity::Edit')}
              </Menu.Item>
              <Menu.Item key="delete" onClick={() => handleDeleteUser(record.id)}>
                删除
              </Menu.Item>
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
        rowKey={(record) => record.id}
        request={async (params) => {
          const { items, totalCount } = await getUsers({
            filter: params?.name,
            skipCount: (params.current! - 1) * params.pageSize!,
            maxResultCount: params?.pageSize || 10,
          });
          return Promise.resolve({
            data: items,
            success: true,
            total: totalCount,
          });
        }}
      ></ProTable>
      <CreateOrUpdateUser
        identityUser={selectedUser}
        roles={checkBoxRoles}
        onFinish={() => tableActionRef.current?.reload()}
        visible={visible}
        onCancel={() => setVisible(false)}
      />
    </PageContainer>
  );
};

export default IdentityUser;
