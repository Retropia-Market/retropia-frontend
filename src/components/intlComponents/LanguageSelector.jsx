import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { item } from '../animations';

const LanguageSelector = () => {
    const { language } = useSelector((s) => s.language);
    const dispatch = useDispatch();
    const options = ['es', 'en', 'gl', 'it'];

    return (
        <motion.div className="lang">
            <motion.div className={language}></motion.div>
            <ul
                variants={item}
                animate="visible"
                initial="hidden"
                exit="hidden"
                className="dropdown"
            >
                {options
                    .sort((a, b) =>
                        a === language ? -1 : b === language ? 1 : 0
                    )
                    .map((lang) => {
                        return (
                            <li
                                key={lang}
                                onClick={() =>
                                    dispatch({
                                        type: 'UPDATE/LANGUAGE',
                                        language: { language: lang },
                                    })
                                }
                            >
                                <div className={lang}></div>
                            </li>
                        );
                    })}
            </ul>
        </motion.div>
    );
};

export default LanguageSelector;
