import React, { SFC } from 'react';
import './Palette.scss';

const colors: Array<string> = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

export interface PaletteItemProps {
  color: string,
  active: boolean,
  onClick: () => void
}

export interface PaletteProps {
  selected: string,
  onSelect: (color: string) => void
}

const PaletteItem: SFC<PaletteItemProps> = ({ 
  color, 
  active, 
  onClick,
}) => {
  return (
    <div
      className={`PaletteItem ${active ? 'active' : ''}`}
      style={{ backgroundColor: color }}
      onClick={onClick}
    />
  );
};

const Palette: SFC<PaletteProps> = ({ 
  selected, 
  onSelect 
}) => {
  return (
    <div className="Palette">
      <h2>색깔을 골라골라</h2>
      <div className="colors">
        {colors.map(color => (
          <PaletteItem 
            color={color} 
            key={color} 
            active={selected === color} 
            onClick={() => onSelect(color)}
          />
        ))}
      </div>
    </div>
  );
};

export default Palette;