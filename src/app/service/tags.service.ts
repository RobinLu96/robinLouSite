import { ITag } from '../util/tag/tag-robin';
import { Injectable, EventEmitter } from '@angular/core';
import { tagData } from '../util/tag/tag-data';

@Injectable()
export class TagsService {
  tags: ITag[];

  onTagUpdate = new EventEmitter();

  constructor() {
    this.tags = tagData;
  }

  toogleTagSelection(tagName: string) {
    const totalSelection = this.tags.reduce(
      (prev, current) => prev + (current.isSelected ? 1 : 0),
      0
    );
    const selectedSkill = this.tags.find(e => e.displayName === tagName);

    if (totalSelection <= 1 && selectedSkill.isSelected) return;

    selectedSkill.isSelected = !selectedSkill.isSelected;
    this.onTagUpdate.emit({
      tags: this.tags.filter(e => e.isSelected)
    });
  }
}
