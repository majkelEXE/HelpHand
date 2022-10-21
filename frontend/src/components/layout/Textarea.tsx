import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import textareaState from '../../atoms/textarea';
import css from './Textarea.module.css';

const Textarea = () => {
  const [textarea, setTextarea] = useRecoilState(textareaState);

  useEffect(() => {
    return () => {
      setTextarea(null);
    };
  }, []);

  return (
    <div className={css.textareaContainer}>
      <textarea
        value={textarea?.text}
        autoFocus={true}
        onChange={(e) =>
          setTextarea({ field: textarea!.field, text: e.currentTarget.value })
        }
      />
    </div>
  );
};

export default Textarea;
