import React, { useEffect } from 'react';
import { StepsForm, ProFormText } from '@ant-design/pro-form';
import { ProFormCheckbox } from '@ant-design/pro-form';
import type { IdentityUserDto } from '../data';
import { createUser, updateUser } from '../service';
import { Modal } from 'antd';
import type { IdentityRoleDto } from '../../identityRole/data';

interface CreateOrUpdateUserProps {
  visible: boolean;
  identityUser?: IdentityUserDto;
  onCancel: () => void;
  onFinish: () => void;
  roles: IdentityRoleDto[];
}

const CreateOrUpdateUser: React.FC<CreateOrUpdateUserProps> = ({
  identityUser,
  visible,
  onCancel,
  onFinish,
  roles = [],
}) => {
  const handleSubmit = async (values: any) => {
    if (!identityUser) {
      createUser({ ...values }).then(() => {});
    } else {
      updateUser(identityUser!.id, {
        ...values,
        concurrencyStamp: identityUser.concurrencyStamp,
      }).then(() => {});
    }
    await onFinish();
    return true;
  };
  useEffect(() => {}, [visible]);
  return (
    <StepsForm
      onFinish={handleSubmit}
      stepsFormRender={(dom, submitter) => {
        return (
          <Modal
            title="新增用户"
            onCancel={onCancel}
            visible={visible}
            footer={submitter}
            destroyOnClose
          >
            {dom}
          </Modal>
        );
      }}
    >
      <StepsForm.StepForm title="基本信息" initialValues={{ ...identityUser }}>
        <ProFormText
          name="userName"
          width="lg"
          label="用户名称"
          placeholder="请输入名称"
          rules={[{ required: true }]}
        />
        {identityUser === undefined ? (
          <ProFormText
            name="password"
            width="lg"
            label="密码"
            fieldProps={{ type: 'password' }}
            placeholder="请输入名称"
            rules={[{ required: true }]}
          />
        ) : null}
        <ProFormText name="name" width="lg" label="名" />
        <ProFormText name="surname" width="lg" label="姓" />
        <ProFormText
          name="email"
          width="lg"
          label="邮箱地址"
          fieldProps={{ type: 'email' }}
          placeholder="请输入名称"
          rules={[{ required: true }]}
        />
        <ProFormText name="phoneNumber" width="lg" label="手机号" />
        <ProFormCheckbox name="lockoutEnabled">登录失败,账户被锁定</ProFormCheckbox>
      </StepsForm.StepForm>
      <StepsForm.StepForm title="角色" initialValues={{ ...identityUser }}>
        <ProFormCheckbox.Group
          name="roleNames"
          layout="horizontal"
          options={roles.map((t) => t.name)}
        />
      </StepsForm.StepForm>
    </StepsForm>
  );
};

export default CreateOrUpdateUser;
