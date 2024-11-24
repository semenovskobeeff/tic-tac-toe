import PropTypes from "prop-types";
import { Field, Information } from "./components";
import styles from "./game.module.css";
import { useCallback, useState, useEffect } from "react";

const GameLayout = ({ isGameEnded, onStartOver, isDraw }) =>
	isGameEnded || isDraw ? (
		<button className={styles["app__start-over"]} onClick={onStartOver}>
			Начать заново
		</button>
	) : null;

GameLayout.propTypes = {
	isGameEnded: PropTypes.bool.isRequired,
	onStartOver: PropTypes.func.isRequired,
	isDraw: PropTypes.bool.isRequired,
};

const WIN_PATTERNS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

function checkWinner(field) {
	for (const pattern of WIN_PATTERNS) {
		const [a, b, c] = pattern;
		if (field[a] && field[a] === field[b] && field[a] === field[c]) {
			return field[a];
		}
	}
	return null;
}

function countEmptyCells(field) {
	return field.filter((cell) => cell === "").length;
}

export const Game = () => {
	const [currentPlayer, setCurrentPlayer] = useState("X"); // кто ходит
	const [isGameEnded, setIsGameEnded] = useState(false); // была ли игра окончена
	const [isDraw, setIsDraw] = useState(false); // была ли ничья
	const [field, setField] = useState(["", "", "", "", "", "", "", "", ""]);
	const [startingNewGame, setStartingNewGame] = useState(false);

	useEffect(() => {
		if (startingNewGame) {
			return;
		}

		const winner = checkWinner(field);
		const count = countEmptyCells(field);

		if (winner) {
			setIsGameEnded(true);
		} else if (count === 0) {
			setIsDraw(true);
		} else {
			if (!isGameEnded) {
				setCurrentPlayer((prev) => (prev === "X" ? "O" : "X"));
			}
		}
	}, [field, isGameEnded, startingNewGame]);

	// Устанавливаем currentPlayer на "X" после сброса
	useEffect(() => {
		if (startingNewGame) {
			setCurrentPlayer("X");
			setStartingNewGame(false); // После установки на "X" сбрасываем флаг
		}
	}, [startingNewGame]);

	const startOver = useCallback(() => {
		setField(["", "", "", "", "", "", "", "", ""]);
		setIsDraw(false);
		setIsGameEnded(false);
		setCurrentPlayer("X");
		setStartingNewGame(true);
	}, []);

	return (
		<div className={styles.app}>
			<Information isDraw={isDraw} isGameEnded={isGameEnded} currentPlayer={currentPlayer} />
			<Field field={field} setField={setField} currentPlayer={currentPlayer} isGameEnded={isGameEnded} />
			<GameLayout isGameEnded={isGameEnded} onStartOver={startOver} isDraw={isDraw} />
		</div>
	);
};
