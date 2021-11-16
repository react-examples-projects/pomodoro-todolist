import {
  Layout,
  Avatar,
  Popover,
  Menu,
  Image,
  Button,
  Modal,
  Form,
  Input,
  Switch,
} from "tiny-ui";

import ErrorText from "./ErrorText";
import useCurrentUser from "../Hooks/User/useCurrentUser";
import useUserData from "../Hooks/User/useUserData";
import SideNavbar from "./SideNavbar";
import {
  getErrorValidation,
  imageToBase64,
  toFormDataObj,
  toggleTheme
} from "../Helpers/utils";
import { useState } from "react";
import { BiMenu } from "react-icons/bi";
import useToggle from "../Hooks/Utils/useToggle";

export default function LayoutPage({ children }) {
  const [isChecked, toggleChecked] = useToggle(false);
  const [imgPreview, setImgPreview] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const {
    user: { perfil_photo, name },
    setPerfilPhoto,
    setUserName,
  } = useCurrentUser();

  const {
    isOpenModalPassword,
    toggleModalPassword,

    isOpenModalChangePhoto,
    toggleModalChangePhoto,

    isOpenModalChangeName,
    toggleModalChangeName,

    // setters
    setUserPasswordMutation,
    setUserPerfilPhotoMutation,
    setUserNameMutation,
  } = useUserData();

  const onChangeFile = async (e) => {
    const [file] = e.target.files;
    const preview = await imageToBase64(file);
    setImgPreview(preview);
    setImgFile(file);
  };

  const changePerfilPhoto = async () => {
    const payload = toFormDataObj({ perfil_photo: imgFile });
    const data = await setUserPerfilPhotoMutation.mutateAsync(payload);
    setPerfilPhoto(data.url);
  };

  const changePassword = async ({ password, passwordConfirm }) => {
    if (password !== passwordConfirm) {
      return alert("Las contraseñas no coinciden");
    }
    await setUserPasswordMutation.mutateAsync({ password, passwordConfirm });
    toggleModalPassword();
  };

  const changeName = async ({ name }) => {
    const data = await setUserNameMutation.mutateAsync({ name });
    setUserName(data.name);
    toggleModalChangeName();
  };

  const toggleThemeApp = ()=>{
    toggleTheme();
    toggleChecked();
  }

  return (
    <>
      <Modal
        visible={isOpenModalPassword}
        header="Cambiar clave"
        footer={null}
        onConfirm={changePassword}
        onCancel={toggleModalPassword}
        centered
      >
        <Form layout="vertical" onFinish={changePassword}>
          <Form.Item
            label="Nueva contraseña"
            name="password"
            rules={[
              {
                message: "La contraseña es obligatoria",
                required: "true",
              },
            ]}
          >
            <Input maxLength={100} type="password" />
          </Form.Item>

          <Form.Item
            label="Confirmar nueva contraseña"
            name="passwordConfirm"
            rules={[
              {
                message: "La este campo es obligatorio",
                required: "true",
              },
            ]}
          >
            <Input maxLength={100} type="password" />
          </Form.Item>

          <Button
            btnType="info"
            type="submit"
            className="mt-1"
            loading={setUserPasswordMutation.isLoading}
            block
          >
            Cambiar contraseña
          </Button>

          <ErrorText
            className="mt-1"
            isVisible={setUserPasswordMutation.isError}
            text={
              "Error al cambiar contraseña " +
              getErrorValidation(setUserPasswordMutation)
            }
          />
        </Form>
      </Modal>

      <Modal
        visible={isOpenModalChangePhoto}
        header="Cambiar foto"
        footer={null}
        onCancel={toggleModalChangePhoto}
        centered
      >
        <Form layout="vertical">
          <label
            htmlFor="perfil_photo"
            className="ty-form-item__label_required ty-form-item__label_colon mb-1 d-block"
          >
            Elegir foto
          </label>
          <input
            id="perfil_photo"
            name="perfil_photo"
            type="file"
            accept="image/jpg, image/png, image/svg, image/jpeg"
            className="ty-input__input input-file-photo-user mb-1 d-block"
            onChange={onChangeFile}
            required
          />

          {imgPreview && (
            <Image src={imgPreview} style={{ width: "100%", height: "66vh" }} />
          )}
          <Button
            btnType="info"
            type="submit"
            className="mt-1"
            onClick={changePerfilPhoto}
            loading={setUserPerfilPhotoMutation.isLoading}
            disabled={imgFile === null}
            block
          >
            Cambiar foto
          </Button>
        </Form>

        <ErrorText
          className="mt-1"
          isVisible={setUserPerfilPhotoMutation.isError}
          text={
            "Error al cambiar la foto: " +
            getErrorValidation(setUserPerfilPhotoMutation)
          }
        />
      </Modal>

      <Modal
        visible={isOpenModalChangeName}
        header="Cambiar nombre"
        footer={null}
        onConfirm={changeName}
        onCancel={toggleModalChangeName}
        centered
      >
        <Form layout="vertical" onFinish={changeName}>
          <Form.Item
            label="Nuevo nombre"
            name="name"
            rules={[
              {
                message: "El nobmre es obligatoria",
                required: "true",
              },
            ]}
          >
            <Input type="text" name="name" maxLength={100} />
          </Form.Item>

          <Button
            btnType="info"
            type="submit"
            className="mt-1"
            loading={setUserNameMutation.isLoading}
            block
          >
            Cambiar nombre
          </Button>
        </Form>

        <ErrorText
          className="mt-1"
          isVisible={setUserNameMutation.isError}
          text={
            "Error al cambiar el nombre: " +
            getErrorValidation(setUserNameMutation)
          }
        />
      </Modal>

      <Layout
        style={{
          height: "100vh",
          maxWidth: "1500px",
          margin: "auto",
          overflow: "hidden",
        }}
      >
        <label htmlFor="toggle-menu" className="toggler-label">
          <BiMenu />
        </label>
        <input type="checkbox" name="toggle-menu" id="toggle-menu" />

        <Layout.Sidebar className="layout-sidebar">
          <SideNavbar />
        </Layout.Sidebar>

        <Layout style={{ overflow: "hidden scroll" }}>
          <Layout.Header className="layout-header mt-3 pe-3 ms-auto">
            <Switch
              className="me-5"
              uncheckedText="☀️"
              checkedText="🌙"
              size="lg"
              checked={isChecked}
              onChange={toggleThemeApp}
              title="Cambiar tema"
            />

            <Popover
              placement="bottom-end"
              trigger="click"
              title={name}
              style={{ textTransform: "capitalize" }}
              content={
                <Menu mode="inline" className="layout-menu-user">
                  <Menu.Item onClick={toggleModalPassword}>
                    Cambiar contraseña
                  </Menu.Item>
                  <Menu.Item onClick={toggleModalChangePhoto}>
                    Cambiar foto
                  </Menu.Item>
                  <Menu.Item onClick={toggleModalChangeName}>
                    Cambiar nombre
                  </Menu.Item>
                </Menu>
              }
            >
              <div style={{ cursor: "pointer" }}>
                <Avatar src={perfil_photo} title={name} />
              </div>
            </Popover>
          </Layout.Header>
          <Layout.Content className="layout-content me-3 pb-6 ps-sm-2 pe-sm-1 me-sm-1">
            <main className="fadeIn">{children}</main>
          </Layout.Content>
        </Layout>
      </Layout>
    </>
  );
}
