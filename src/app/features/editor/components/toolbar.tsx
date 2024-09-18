import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import { cn, isTextType } from "@/lib/utils";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  ArrowDown,
  ArrowUp,
  CaseUpper,
  ChevronDown,
  Trash,
} from "lucide-react";
import { useState } from "react";
import { BsBorderWidth } from "react-icons/bs";
import { FaBold, FaItalic, FaStrikethrough, FaUnderline } from "react-icons/fa";
import { RxTransparencyGrid } from "react-icons/rx";
import { ActiveTool, Editor, FONT_SIZE, FONT_WEIGHT } from "../../types";
import FontSizeInput from "./font-size-input";

interface Props {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export default function Toolbar({
  editor,
  activeTool,
  onChangeActiveTool,
}: Props) {
  const initialFillColor = editor?.getActiveFillColor();
  const initialStrokeColor = editor?.getActiveStrokeColor();
  const initialFontFamily = editor?.getActiveFontFamily();
  const initialFontStyle = editor?.getActiveFontStyle();
  const initialFontLineThrough = editor?.getActiveFontLinethrough();
  const initialFontUnderline = editor?.getActiveFontUnderline();
  const initialTextAlign = editor?.getActiveTextAlign();
  const initialFontSize = editor?.getActiveFontSize() || FONT_SIZE;
  const initialTextUppercase = editor?.getActiveTextCase();

  const initialFontWeight = editor?.getActiveFontWeight() || FONT_WEIGHT;
  const [properties, setProperties] = useState({
    fillColor: initialFillColor,
    strokeColor: initialStrokeColor,
    fontFamily: initialFontFamily,
    fontWeight: initialFontWeight,
    fontStyle: initialFontStyle,
    fontLineThrough: initialFontLineThrough,
    fontUnderline: initialFontUnderline,
    textAlign: initialTextAlign,
    fontSize: initialFontSize,
    textUppercase: initialTextUppercase,
  });

  const selectedObject = editor?.selectedObjects[0];
  const selectedObjectTypes = editor?.selectedObjects[0]?.type;
  const isText = isTextType(selectedObjectTypes);

  const toggleTextCase = () => {
    if (!selectedObject) return;

    const newValue = properties.textUppercase ? false : true;

    editor?.toggleTextCase(newValue);
    setProperties((current) => ({
      ...current,
      textUppercase: newValue,
    }));
  };

  const onChangeFontSize = (value: number) => {
    if (!selectedObject) return;

    editor?.changeFontSize(value);
    setProperties((current) => ({
      ...current,
      fontSize: value,
    }));
  };

  const toggleBold = () => {
    if (!selectedObject) return;

    const newValue = properties.fontWeight > 500 ? 500 : 700;

    editor?.changeFontWeight(newValue);
    setProperties((current) => ({
      ...current,
      fontWeight: newValue,
    }));
  };

  const toggleItalic = () => {
    if (!selectedObject) return;

    const isItalic = properties.fontStyle === "italic";
    const newValue = isItalic ? "normal" : "italic";

    editor?.changeFontStyle(newValue);
    setProperties((current) => ({
      ...current,
      fontStyle: newValue,
    }));
  };

  const toggleLinethrough = () => {
    if (!selectedObject) return;

    const newValue = properties.fontLineThrough ? false : true;

    editor?.changeFontLinethrough(newValue);
    setProperties((current) => ({
      ...current,
      fontLineThrough: newValue,
    }));
  };

  const toggleUnderline = () => {
    if (!selectedObject) return;

    const newValue = properties.fontUnderline ? false : true;

    editor?.changeFontUnderline(newValue);
    setProperties((current) => ({
      ...current,
      fontUnderline: newValue,
    }));
  };

  const onChangeTextAlign = (value: string) => {
    if (!selectedObject) return;

    editor.changeTextAlign(value);
    setProperties((current) => ({
      ...current,
      textAlign: value,
    }));
  };

  if (editor?.selectedObjects.length === 0) {
    return (
      <div className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2" />
    );
  }

  return (
    <div className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2">
      <div className="flex items-center h-full justify-center">
        <Hint
          label="Color"
          side="bottom"
          sideOffset={5}
        >
          <Button
            onClick={() => onChangeActiveTool("fill")}
            size={"icon"}
            variant={"ghost"}
            className={cn(activeTool === "fill" && "bg-gray-100")}
          >
            <div
              className="rounded-sm size-4 border"
              style={{
                backgroundColor: properties.fillColor,
              }}
            />
          </Button>
        </Hint>
      </div>

      {!isText && (
        <div className="flex items-center h-full justify-center">
          <Hint
            label="Stroke Color"
            side="bottom"
            sideOffset={5}
          >
            <Button
              onClick={() => onChangeActiveTool("stroke-color")}
              size={"icon"}
              variant={"ghost"}
              className={cn(activeTool === "stroke-color" && "bg-gray-100")}
            >
              <div
                className="rounded-sm size-4 border-2 bg-white"
                style={{
                  borderColor: properties.strokeColor,
                }}
              />
            </Button>
          </Hint>
        </div>
      )}

      {!isText && (
        <div className="flex items-center h-full justify-center">
          <Hint
            label="Stroke width"
            side="bottom"
            sideOffset={5}
          >
            <Button
              onClick={() => onChangeActiveTool("stroke-width")}
              size={"icon"}
              variant={"ghost"}
              className={cn(activeTool === "stroke-width" && "bg-gray-100")}
            >
              <BsBorderWidth className="size-4" />
            </Button>
          </Hint>
        </div>
      )}

      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint
            label="Font"
            side="bottom"
            sideOffset={5}
          >
            <Button
              onClick={() => onChangeActiveTool("font")}
              size={"icon"}
              variant={"ghost"}
              className={cn(
                "w-auto px-4",
                activeTool === "font" && "bg-gray-100"
              )}
            >
              <div className="max-w-[100px] truncate">
                {properties.fontFamily}
              </div>
              <ChevronDown className="size-4 ml-2 shrink-0" />
            </Button>
          </Hint>
        </div>
      )}

      {isText && (
        <div className="flex items-center h-full justify-center">
          <FontSizeInput
            value={properties.fontSize}
            onChange={onChangeFontSize}
          />
        </div>
      )}

      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint
            label="Bold"
            side="bottom"
            sideOffset={5}
          >
            <Button
              onClick={toggleBold}
              size={"icon"}
              variant={"ghost"}
              className={cn(properties.fontWeight > 500 && "bg-gray-100")}
            >
              <FaBold className="size-4" />
            </Button>
          </Hint>
        </div>
      )}

      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint
            label="Italic"
            side="bottom"
            sideOffset={5}
          >
            <Button
              onClick={toggleItalic}
              size={"icon"}
              variant={"ghost"}
              className={cn(properties.fontStyle === "italic" && "bg-gray-100")}
            >
              <FaItalic className="size-4" />
            </Button>
          </Hint>
        </div>
      )}

      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint
            label="Underline"
            side="bottom"
            sideOffset={5}
          >
            <Button
              onClick={toggleUnderline}
              size={"icon"}
              variant={"ghost"}
              className={cn(properties.fontUnderline && "bg-gray-100")}
            >
              <FaUnderline className="size-4" />
            </Button>
          </Hint>
        </div>
      )}

      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint
            label="Strike"
            side="bottom"
            sideOffset={5}
          >
            <Button
              onClick={toggleLinethrough}
              size={"icon"}
              variant={"ghost"}
              className={cn(properties.fontLineThrough && "bg-gray-100")}
            >
              <FaStrikethrough className="size-4" />
            </Button>
          </Hint>
        </div>
      )}

      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint
            label="Align left"
            side="bottom"
            sideOffset={5}
          >
            <Button
              onClick={() => onChangeTextAlign("left")}
              size={"icon"}
              variant={"ghost"}
              className={cn(properties.textAlign === "left" && "bg-gray-100")}
            >
              <AlignLeft className="size-4" />
            </Button>
          </Hint>
        </div>
      )}

      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint
            label="Align center"
            side="bottom"
            sideOffset={5}
          >
            <Button
              onClick={() => onChangeTextAlign("center")}
              size={"icon"}
              variant={"ghost"}
              className={cn(properties.textAlign === "center" && "bg-gray-100")}
            >
              <AlignCenter className="size-4" />
            </Button>
          </Hint>
        </div>
      )}

      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint
            label="Align right"
            side="bottom"
            sideOffset={5}
          >
            <Button
              onClick={() => onChangeTextAlign("right")}
              size={"icon"}
              variant={"ghost"}
              className={cn(properties.textAlign === "right" && "bg-gray-100")}
            >
              <AlignRight className="size-4" />
            </Button>
          </Hint>
        </div>
      )}

      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint
            label="Align justify"
            side="bottom"
            sideOffset={5}
          >
            <Button
              onClick={() => onChangeTextAlign("justify")}
              size={"icon"}
              variant={"ghost"}
              className={cn(
                properties.textAlign === "justify" && "bg-gray-100"
              )}
            >
              <AlignJustify className="size-4" />
            </Button>
          </Hint>
        </div>
      )}

      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint
            label="Uppercase"
            side="bottom"
            sideOffset={5}
          >
            <Button
              onClick={toggleTextCase}
              size={"icon"}
              variant={"ghost"}
              className={cn(properties.textUppercase && "bg-gray-100")}
            >
              <CaseUpper className="size-4" />
            </Button>
          </Hint>
        </div>
      )}

      <div className="flex items-center h-full justify-center">
        <Hint
          label="Bring forward"
          side="bottom"
          sideOffset={5}
        >
          <Button
            onClick={() => editor?.bringForward()}
            size={"icon"}
            variant={"ghost"}
          >
            <ArrowUp className="size-4" />
          </Button>
        </Hint>
      </div>

      <div className="flex items-center h-full justify-center">
        <Hint
          label="Send backward"
          side="bottom"
          sideOffset={5}
        >
          <Button
            onClick={() => editor?.sendBackward()}
            size={"icon"}
            variant={"ghost"}
          >
            <ArrowDown className="size-4" />
          </Button>
        </Hint>
      </div>

      <div className="flex items-center h-full justify-center">
        <Hint
          label="Change opacity"
          side="bottom"
          sideOffset={5}
        >
          <Button
            onClick={() => onChangeActiveTool("opacity")}
            size={"icon"}
            variant={"ghost"}
            className={cn(activeTool === "opacity" && "bg-gray-100")}
          >
            <RxTransparencyGrid className="size-4" />
          </Button>
        </Hint>
      </div>

      <div className="flex items-center h-full justify-center">
        <Hint
          label="Delete object"
          side="bottom"
          sideOffset={5}
        >
          <Button
            onClick={() => editor?.deleteObject()}
            size={"icon"}
            variant={"ghost"}
          >
            <Trash className="size-4 stroke-destructive" />
          </Button>
        </Hint>
      </div>
    </div>
  );
}
