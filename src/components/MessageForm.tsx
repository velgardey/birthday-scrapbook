import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const FormWrapper = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${props => props.theme.colors.background};
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  z-index: 1001;
  width: 90%;
  max-width: 500px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const TextArea = styled.textarea`
  padding: 1rem;
  font-size: 1rem;
  resize: vertical;
  border: 2px solid ${props => props.theme.colors.primary}40;
  border-radius: 10px;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}40;
  }
`;

const Button = styled(motion.button)`
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.accent};
  }
`;

const FileInputWrapper = styled.div`
  position: relative;
  overflow: hidden;
  display: inline-block;
`;

const FileInputLabel = styled.label`
  display: inline-block;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  background-color: ${props => props.theme.colors.accent};
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.primary};
  }
`;

const FileInput = styled.input`
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

const MessageForm = ({ onSubmit, onClose }: { onSubmit: (message: any) => void, onClose: () => void }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('content', content);
    if (image) formData.append('image', image);
    formData.append('initialX', String(Math.random() * (window.innerWidth - 250)));
    formData.append('initialY', String(Math.random() * (window.innerHeight - 250)));
    onSubmit(formData);
  };

  return (
    <FormWrapper
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
    >
      <Form onSubmit={handleSubmit}>
        <TextArea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Your message"
          required
          rows={4}
        />
        <FileInputWrapper>
          <FileInputLabel>
            {image ? 'Image selected' : 'Choose an image'}
            <FileInput
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </FileInputLabel>
        </FileInputWrapper>
        <ButtonContainer>
          <Button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit">
            Add Message
          </Button>
          <Button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onClose}>
            Cancel
          </Button>
        </ButtonContainer>
      </Form>
    </FormWrapper>
  );
};

export default MessageForm;