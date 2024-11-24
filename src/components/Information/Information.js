import PropTypes from "prop-types";
import styles from "./information.module.css";

const InformationLayout = ({ isDraw, isGameEnded, currentPlayer }) => (
	<div className={`${styles.information} ${isDraw ? styles.draw : isGameEnded ? styles.win : ""}`}>
		{isDraw ? "Ничья" : isGameEnded ? `Победа: ${currentPlayer}` : `Ходит: ${currentPlayer}`}
	</div>
);

InformationLayout.propTypes = {
	isDraw: PropTypes.bool.isRequired,
	isGameEnded: PropTypes.bool.isRequired,
	currentPlayer: PropTypes.string.isRequired,
};

export const Information = ({ isDraw, isGameEnded, currentPlayer }) => {
	return <InformationLayout isDraw={isDraw} isGameEnded={isGameEnded} currentPlayer={currentPlayer} />;
};
