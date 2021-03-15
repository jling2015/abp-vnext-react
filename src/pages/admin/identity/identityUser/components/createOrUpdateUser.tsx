import React, { useEffect } from 'react';
import { StepsForm, ProFormText } from '@ant-design/pro-form';
import { ProFormCheckbox } from '@ant-design/pro-form';
import type { IdentityUserDto } from '../data';
import { createUser, updateUser } from '../service';
import { Modal } from 'antd';

interface CreateOrUpdateUserProps {
  visible: boolean;
  identityUser?: IdentityUserDto;
  onCancel: () => void;
  onFinish: () => void;
}

const CreateOrUpdateUser: React.FC<CreateOrUpdateUserProps> = ({
  identityUser,
  visible,
  onCancel,
  onFinish,
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
      <StepsForm.StepForm title="基本信息">
        <ProFormText
          name="name"
          width="lg"
          label="用户名称"
          placeholder="请输入名称"
          rules={[{ required: true }]}
        />
        <ProFormText
          name="name"
          width="lg"
          label="密码"
          fieldProps={{ type: 'password' }}
          placeholder="请输入名称"
          rules={[{ required: true }]}
        />
        <ProFormText name="name" width="lg" label="名" />
        <ProFormText name="name" width="lg" label="姓" />
        <ProFormText
          name="name"
          width="lg"
          label="邮箱地址"
          fieldProps={{ type: 'email' }}
          placeholder="请输入名称"
          rules={[{ required: true }]}
        />
        <ProFormText name="name" width="lg" label="手机号" fieldProps={{ type: 'number' }} />
        <ProFormCheckbox.Group
          name="checkbox"
          layout="vertical"
          options={['登录失败,账户被锁定']}
        />
      </StepsForm.StepForm>
      <StepsForm.StepForm title="角色">
        <ProFormCheckbox.Group
          name="checkbox"
          layout="vertical"
          options={['登录失败,账户被锁定']}
        />
      </StepsForm.StepForm>
    </StepsForm>
  );
};

export default CreateOrUpdateUser;
