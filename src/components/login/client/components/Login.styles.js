import styled from "styled-components";
import { media } from "../../../../helpers/styleUtil";

import { Form } from "antd";

export const FormWrapper = styled(Form)`
  width: 28%;
  padding: 20px 20px !important;
  background-color: #fff;
  box-shadow: 2px 2px 2px #cccccc;
  line-height: 18px;
  border: 2px solid #ccc;
  border-radius: 5px;

  ${media.md`
    width: 70%
  `} ${media.sm`
    width: 90%
  `};
`;

export const FormItemWrapper = styled(Form.Item)`
  .ant-input-prefix {
    font-size: 18px;
  }
  .ant-input {
    height: 48px;
    font-size: 18px;
  }
  .ant-btn {
    width: 100%;
    height: 48px;
    font-size: 20px;
  }
`;
