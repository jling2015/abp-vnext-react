import React, { useEffect } from 'react';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { ProFormCheckbox } from '@ant-design/pro-form';
import type { IdentityRoleDto } from '../data';
import { createRole, updateRole } from '../service';
import { Form } from 'antd';

interface CreateOrUpdateRoleProps {
  visible: boolean;
  identityRole?: IdentityRoleDto;
  onVisibleChange: (visible: boolean) => void;
  onFinish: () => void;
}

const CreateOrUpdateRole: React.FC<CreateOrUpdateRoleProps> = ({
  identityRole,
  visible,
  onVisibleChange,
  onFinish,
}) => {
  const [form] = Form.useForm();
  const handleSubmit = async (values: any) => {
    if (!identityRole) {
      await createRole({ ...values });
    } else {
      updateRole(identityRole!.id, {
        ...values,
        concurrencyStamp: identityRole.concurrencyStamp,
      }).then(() => {});
    }
    await onFinish();
    return true;
  };
  useEffect(() => {
    form.setFieldsValue({ ...identityRole });
  }, [visible]);
  return (
    <ModalForm
      title={identityRole ? '编辑角色' : '新增角色'}
      width={520}
      visible={visible}
      form={form}
      onVisibleChange={onVisibleChange}
      onFinish={handleSubmit}
    >
      <ProFormText width="lg" name="name" label="角色名称" required placeholder="请输入名称" />
      <ProFormCheckbox name="isDefault">默认</ProFormCheckbox>
      <ProFormCheckbox name="isPublic">公开</ProFormCheckbox>
    </ModalForm>
  );
};

export default CreateOrUpdateRole;
