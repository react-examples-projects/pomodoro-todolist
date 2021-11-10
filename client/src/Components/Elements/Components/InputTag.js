import { useState } from "react";
import { Input, Tag, Button, Row, Col } from "tiny-ui";
import { formatTagTitles } from "../../Helpers/utils";
import proptypes from "prop-types";

function InputTag({ onChangeTags, defaultTags, size, ...props }) {
  const [tags, setTags] = useState(defaultTags || []);
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#a7a7a7");
  const small = size === "sm" ? "sm" : null;
  const isFullTag = tags.length >= 5;

  const addTag = () => {
    if (!!title) {
      setTags(() => {
        const formatTags = formatTagTitles(title, color);
        const newTags = [...tags, ...formatTags];
        onChangeTags?.(newTags);
        setTitle("");
        return newTags;
      });
    }
  };

  const removeTag = (id) => {
    const filterTags = tags.filter((tag) => tag.id !== id);
    setTags(filterTags);
    onChangeTags?.(filterTags);
  };

  return (
    <div {...props}>
      <Row gutter={3}>
        <Col span={16}>
          <Input
            type="text"
            placeholder="Elige sabiamente tus etiquetas..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isFullTag}
            size={small}
          />
        </Col>
        <Col span={4}>
          <Input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            size={small}
          />
        </Col>
        <Col span={4}>
          <Button
            type="button"
            onClick={addTag}
            disabled={isFullTag}
            size={small}
          >
            Añadir
          </Button>
        </Col>
        <Col span={24}>
          <p className="ty-form-item__helper">
            Separa etiquetas por comas (,) y no deben de pasar de 20 carácteres
          </p>
        </Col>
      </Row>

      {tags?.length > 0 && (
        <div
          className="mt-1 d-flex"
          style={{ maxHeight: "118px", overflow: "scroll hidden" }}
        >
          {tags.map((tag) => (
            <Tag
              color={tag.color}
              className="mb-1"
              key={tag.id}
              onClose={() => removeTag(tag.id)}
              closable
            >
              <small>{tag.title}</small>
            </Tag>
          ))}
        </div>
      )}
    </div>
  );
}

InputTag.propTypes = {
  onChangeTags: proptypes.func,
  defaultTags: proptypes.arrayOf(proptypes.object),
  size: proptypes.string,
};

export default InputTag;
