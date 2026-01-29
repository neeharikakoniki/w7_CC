import { StyleSheet} from 'react-native';
import type { ProductVariant } from '../types/product';

type VariantSelectorProps={
    variants: ProductVariant[];
    selectedIndex:number;
    onChange: (index: number) => void;
}

const styles = StyleSheet.create({
    container:{

    },
    button:{

    },
    selected:{

    },
    unselected:{

    }
})

function VariantSelector ({
    variants,
    selectedIndex,
    onChange,
}: VariantSelectorProps){
    return (
        <div style = {styles.container}
>
    {variants.map((variant,index)=>(
        <button
        key = {variant.size}
        onClick={(e) =>{
            e.stopPropagation();
            onChange(index);
        }}

        style = {{
            ...styles.button,
            ...(index === selectedIndex
                ? styles.selected
                : styles.unselected),
        }}
        >
            {variant.size}
        </button>
    ))}
</div>
    );
}

export default VariantSelector;