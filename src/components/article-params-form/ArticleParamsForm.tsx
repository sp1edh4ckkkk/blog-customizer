import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { Text } from 'src/ui/text';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Separator } from 'src/ui/separator';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';

import {
	OptionType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

const FontFamily = ({
	selected,
	onChange,
}: {
	selected: OptionType;
	onChange: (option: OptionType) => void;
}) => {
	return (
		<Select
			title='шрифт'
			selected={selected}
			options={fontFamilyOptions}
			onChange={onChange}
		/>
	);
};

const FontColor = ({
	selected,
	onChange,
}: {
	selected: OptionType;
	onChange: (option: OptionType) => void;
}) => {
	return (
		<Select
			title='Цвет шрифта'
			selected={selected}
			options={fontColors}
			onChange={onChange}
		/>
	);
};

const BackgroundColor = ({
	selected,
	onChange,
}: {
	selected: OptionType;
	onChange: (option: OptionType) => void;
}) => {
	return (
		<Select
			title='Цвет фона'
			selected={selected}
			options={backgroundColors}
			onChange={onChange}
		/>
	);
};

const ContentWidth = ({
	selected,
	onChange,
}: {
	selected: OptionType;
	onChange: (option: OptionType) => void;
}) => {
	return (
		<Select
			title='Ширина контента'
			selected={selected}
			options={contentWidthArr}
			onChange={onChange}
		/>
	);
};

const FontSize = ({
	selected,
	onChange,
}: {
	selected: OptionType;
	onChange: (option: OptionType) => void;
}) => {
	return (
		<RadioGroup
			name='radio'
			title='Размер шрифта'
			selected={selected}
			options={fontSizeOptions}
			onChange={onChange}
		/>
	);
};

export const ArticleParamsForm = ({
	setArticleState,
}: {
	setArticleState: React.Dispatch<React.SetStateAction<ArticleStateType>>;
}) => {
	const [state, setState] = useState<ArticleStateType>(defaultArticleState);
	const [openMenu, setOpenMenu] = useState(false);

	const outsideAction = useRef<HTMLDivElement>(null);

	const openBtn = () => {
		setOpenMenu(!openMenu);
	};

	const applyBtn = (e: React.FormEvent) => {
		e.preventDefault();
		setArticleState(state);
	};

	const clearBtn = () => {
		setState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	useEffect(() => {
		const outsideClick = (e: MouseEvent) => {
			if (
				outsideAction.current &&
				!outsideAction.current.contains(e.target as Node)
			) {
				setOpenMenu(false);
			}
		};

		if (openMenu) {
			document.addEventListener('mousedown', outsideClick);
		} else {
			document.removeEventListener('mousedown', outsideClick);
		}

		return () => {
			document.removeEventListener('mousedown', outsideClick);
		};
	});

	return (
		<>
			<ArrowButton isOpen={openMenu} onClick={openBtn} />
			<aside
				ref={outsideAction}
				className={clsx(styles.container, {
					[styles.container_open]: openMenu,
				})}>
				<form className={styles.form} onSubmit={applyBtn} onReset={clearBtn}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<FontFamily
						selected={state.fontFamilyOption}
						onChange={(value) =>
							setState({ ...state, fontFamilyOption: value })
						}
					/>

					<FontSize
						selected={state.fontSizeOption}
						onChange={(value) => setState({ ...state, fontSizeOption: value })}
					/>

					<FontColor
						selected={state.fontColor}
						onChange={(value) => setState({ ...state, fontColor: value })}
					/>

					<Separator />

					<BackgroundColor
						selected={state.backgroundColor}
						onChange={(value) => setState({ ...state, backgroundColor: value })}
					/>

					<ContentWidth
						selected={state.contentWidth}
						onChange={(value) => setState({ ...state, contentWidth: value })}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={clearBtn}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
