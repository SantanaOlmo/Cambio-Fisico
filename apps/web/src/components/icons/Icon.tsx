import React from 'react';

import chefHat from '../../assets/icons/chef-hat.svg?raw';
import plus from '../../assets/icons/plus.svg?raw';
import search from '../../assets/icons/search.svg?raw';
import arrowLeft from '../../assets/icons/arrow-left.svg?raw';
import pencil from '../../assets/icons/pencil.svg?raw';
import hash from '../../assets/icons/hash.svg?raw';
import calendar from '../../assets/icons/calendar.svg?raw';
import image from '../../assets/icons/image.svg?raw';
import x from '../../assets/icons/x.svg?raw';
import zoomIn from '../../assets/icons/zoom-in.svg?raw';
import download from '../../assets/icons/download.svg?raw';
import fileJson from '../../assets/icons/file-json.svg?raw';
import fileSpreadsheet from '../../assets/icons/file-spreadsheet.svg?raw';
import hardDrive from '../../assets/icons/hard-drive.svg?raw';
import trash2 from '../../assets/icons/trash-2.svg?raw';
import checkCircle from '../../assets/icons/check-circle.svg?raw';
import alertCircle from '../../assets/icons/alert-circle.svg?raw';
import info from '../../assets/icons/info.svg?raw';
import alertTriangle from '../../assets/icons/alert-triangle.svg?raw';
import chevronDown from '../../assets/icons/chevron-down.svg?raw';
import fileUp from '../../assets/icons/file-up.svg?raw';
import eye from '../../assets/icons/eye.svg?raw';
import edit3 from '../../assets/icons/edit-3.svg?raw';
import layoutDashboard from '../../assets/icons/layout-dashboard.svg?raw';
import plusCircle from '../../assets/icons/plus-circle.svg?raw';
import list from '../../assets/icons/list.svg?raw';
import flame from '../../assets/icons/flame.svg?raw';
import heart from '../../assets/icons/heart.svg?raw';
import moon from '../../assets/icons/moon.svg?raw';
import salad from '../../assets/icons/salad.svg?raw';
import coffee from '../../assets/icons/coffee.svg?raw';
import utensils from '../../assets/icons/utensils.svg?raw';
import apple from '../../assets/icons/apple.svg?raw';
import fileText from '../../assets/icons/file-text.svg?raw';
import camera from '../../assets/icons/camera.svg?raw';
import trendingUp from '../../assets/icons/trending-up.svg?raw';
import trendingDown from '../../assets/icons/trending-down.svg?raw';
import minus from '../../assets/icons/minus.svg?raw';
import scale from '../../assets/icons/scale.svg?raw';
import droplets from '../../assets/icons/droplets.svg?raw';
import zap from '../../assets/icons/zap.svg?raw';
import dumbbell from '../../assets/icons/dumbbell.svg?raw';

export const ICON_MAP = {
  'chef-hat': chefHat,
  'plus': plus,
  'search': search,
  'arrow-left': arrowLeft,
  'pencil': pencil,
  'hash': hash,
  'calendar': calendar,
  'image': image,
  'x': x,
  'zoom-in': zoomIn,
  'download': download,
  'file-json': fileJson,
  'file-spreadsheet': fileSpreadsheet,
  'hard-drive': hardDrive,
  'trash-2': trash2,
  'check-circle': checkCircle,
  'alert-circle': alertCircle,
  'info': info,
  'alert-triangle': alertTriangle,
  'chevron-down': chevronDown,
  'file-up': fileUp,
  'eye': eye,
  'edit-3': edit3,
  'layout-dashboard': layoutDashboard,
  'plus-circle': plusCircle,
  'list': list,
  'flame': flame,
  'heart': heart,
  'moon': moon,
  'salad': salad,
  'coffee': coffee,
  'utensils': utensils,
  'apple': apple,
  'file-text': fileText,
  'camera': camera,
  'trending-up': trendingUp,
  'trending-down': trendingDown,
  'minus': minus,
  'scale': scale,
  'droplets': droplets,
  'zap': zap,
  'dumbbell': dumbbell,
};

export type IconName = keyof typeof ICON_MAP;

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  strokeWidth?: number | string;
}

export function Icon({ name, className, strokeWidth = 2, ...props }: IconProps) {
  const rawSvg = ICON_MAP[name];
  if (!rawSvg) return null;

  // Extract the inner HTML content of the SVG
  const innerHtml = rawSvg
    .replace(/<svg[^>]*>/i, '')
    .replace(/<\/svg>/i, '');

  // Extract attributes like viewBox
  const viewBoxMatch = rawSvg.match(/viewBox="([^"]+)"/i);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';

  return (
    <svg
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      dangerouslySetInnerHTML={{ __html: innerHtml }}
      {...props}
    />
  );
}
