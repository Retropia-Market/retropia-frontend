import { useDispatch, useSelector } from 'react-redux';

const LanguageSelector = () => {
    const { language } = useSelector((s) => s.language);
    const dispatch = useDispatch();
    const options = ['en', 'es', 'it'];

    return (
        <div className="lang">
            <div className={language}></div>
            <ul className="dropdown">
                {options
                    .sort((a, b) =>
                        a === language ? -1 : b === language ? 1 : 0
                    )
                    .map((lang) => {
                        return (
                            <li
                                onClick={() =>
                                    dispatch({
                                        type: 'UPDATE',
                                        language: { language: lang },
                                    })
                                }
                            >
                                <div className={lang}></div>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
};

export default LanguageSelector;
