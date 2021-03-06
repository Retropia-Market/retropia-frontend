import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

import CheckIcon from '../img/icons/check.svg';
import CancelIcon from '../img/icons/cancel.svg';
import { item } from './animations';
import { motion } from 'framer-motion';

const DeleteProduct = ({ productId, setHide }) => {
  const user = useSelector((s) => s.user);
  const [showAlert, setShowAlert] = useState();

  const handleClick = async (productId) => {
    const ret = await fetch(
      `https://api.retropia-market.com/catalogue/${productId}/product-delete`,
      {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      }
    );
    if (ret.ok) setHide(true);
  };

  return (
    <>
      <div onClick={() => setShowAlert(!showAlert)}>
        <FontAwesomeIcon className="delete-icon" icon={faTrashAlt}>
          Delete
        </FontAwesomeIcon>
      </div>
      {showAlert && (
        <div className="update-modal">
          <div className="modal-bg" onClick={() => setShowAlert(false)}>
            <motion.div
              className="modal-fg delete-modal"
              variants={item}
              animate="visible"
              initial="hidden"
              exit="hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="update-title">
                <FormattedMessage id="delete.title" />
              </h3>
              <div className="delete-inputs">
                <button
                  className="delete-button yes"
                  onClick={() => handleClick(productId)}
                >
                  <img src={CheckIcon} alt="confirm" />
                </button>
                <button
                  className="delete-button no"
                  onClick={() => setShowAlert(!showAlert)}
                >
                  <img src={CancelIcon} alt="cancel" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteProduct;
