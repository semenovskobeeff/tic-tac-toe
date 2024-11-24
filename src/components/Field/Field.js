import PropTypes from "prop-types";
import styles from "./field.module.css";

const FieldLayout = ({ field, setField, currentPlayer, isGameEnded }) => (
	<div className={styles.field}>
		{field.map((item, index) => (
			<div key={index} className={styles.field__cell}>
				<button
					className={styles.field__button}
					onClick={() => {
						if (!isGameEnded && item === "") {
							const newField = [...field];
							newField[index] = currentPlayer;
							setField(newField);
						}
					}}
				>
					{item}
				</button>
			</div>
		))}
	</div>
);

FieldLayout.propTypes = {
	field: PropTypes.arrayOf(PropTypes.string).isRequired,
	setField: PropTypes.func.isRequired,
	currentPlayer: PropTypes.string.isRequired,
	isGameEnded: PropTypes.bool.isRequired,
};

export const Field = ({ field, setField, currentPlayer, isGameEnded }) => {
	return <FieldLayout field={field} setField={setField} currentPlayer={currentPlayer} isGameEnded={isGameEnded} />;
};
