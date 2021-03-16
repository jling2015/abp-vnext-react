import { PageContainer } from '@ant-design/pro-layout';
import { Button, Dropdown, Menu } from 'antd';
import ProTable from '@ant-design/pro-table';
import { IdentityRoleDto } from './data';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { deleteRole, getRoles } from './service';
import { CaretDownOutlined, PlusOutlined, SettingFilled } from '@ant-design/icons';
import { useLocalization } from 'umi';
import CreateOrUpdateRole from './components/createOrUpdateRole';
import React, { useRef, useState } from 'react';

const IdentityRole: React.FC = () => {
  const locale = useLocalization();
  const [selectedRole, setSelectedRole] = useState<IdentityRoleDto>();
  const [visible, setVisible] = useState<boolean>(false);
  const tableActionRef = useRef<ActionType>();
  const editRole = async (record: IdentityRoleDto) => {
    await setSelectedRole(record);
    await setVisible(true);
  };
  const createRole = async () => {
    await setSelectedRole(undefined);
    await setVisible(true);
  };
  const deleteRoleItem = async (id: string) => {
    await deleteRole(id);
    tableActionRef.current?.reload();
  };
  const columns: ProColumns<IdentityRoleDto>[] = [
    {
      title: locale('AbpIdentity::Actions'),
      width: 180,
      key: 'option',
      valueType: 'option',
      render: (text, record) => [
        <Dropdown
          key="dropdown"
          overlay={
            <Menu>
              <Menu.Item onClick={() => editRole(record)}>{locale('AbpIdentity::Edit')}</Menu.Item>
              <Menu.Item>{locale('AbpIdentity::Permissions')}</Menu.Item>
              <Menu.Item onClick={() => deleteRoleItem(record.id)}>
                {locale('AbpIdentity::Delete')}
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
      title: locale('AbpIdentity::RoleName'),
      key: 'name',
      dataIndex: 'name',
    },
  ];

  return (
    <PageContainer
      extra={
        <Button type="primary" onClick={async () => createRole()}>
          <PlusOutlined />
          {locale('AbpIdentity::NewRole')}
        </Button>
      }
    >
      <ProTable<IdentityRoleDto>
        columns={columns}
        actionRef={tableActionRef}
        rowKey={(recrod) => recrod.id}
        request={async (params) => {
          const { items, totalCount } = await getRoles({
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
      <CreateOrUpdateRole
        identityRole={selectedRole}
        onFinish={() => tableActionRef.current?.reload()}
        visible={visible}
        onVisibleChange={setVisible}
      />
    </PageContainer>
  );
};

export default IdentityRole;
