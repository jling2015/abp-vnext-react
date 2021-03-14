import React,{ useEffect } from "react";
import {
  ModalForm,
  ProFormText
} from '@ant-design/pro-form';
import { ProFormCheckbox } from "@ant-design/pro-form";
import { IdentityRoleDto } from "../data";
import { createRole,updateRole } from '../service'
import { Form } from "antd";
interface CreateOrUpdateRoleProps {
  visible:boolean;
  identityRole?:IdentityRoleDto
  onVisibleChange:(visible:boolean)=>void
  onFinish:()=>void
}

const CreateOrUpdateRole: React.FC<CreateOrUpdateRoleProps> = ({ identityRole,visible,onVisibleChange,onFinish }) => {

  const [form] = Form.useForm();
  const handleSubmit= async(values:any)=>{
    if (!identityRole) {
      createRole({...values}).then(result=>{

      })
    } else {
      updateRole(identityRole!.id,{...values,concurrencyStamp:identityRole.concurrencyStamp}).then(result=>{

      })
    }
    await onFinish();
    return true;
  }
  useEffect(()=>{
    const checkbox:string[] = []
    checkbox.concat(identityRole?.isDefault?["默认"]:[])
    checkbox.concat(identityRole?.isPublic?["公开"]:[])
    form.setFieldsValue({name:identityRole?.name,checkbox, })
  },[visible])
  return (
    <ModalForm
      title={identityRole?'编辑角色':'新增角色'}
      width={520}
      visible={visible}
      form={form}
      onVisibleChange={onVisibleChange}
      onFinish={handleSubmit}>
      <ProFormText
          width="lg"
          name="name"
          label="角色名称"
          required
          placeholder="请输入名称"
        />
        <ProFormCheckbox.Group
          name="checkbox"
          layout="vertical"
          options={['默认', '公开']}
        />
    </ModalForm>
  )
}

export default CreateOrUpdateRole;
