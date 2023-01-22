import { DragDropFileUploadDirective } from './drag-drop-file-upload.directive';

describe('DragDropFileUploadDirective', () => {
  const event = { preventDefault: () => {}, stopPropagation: () => {} };
  let directive: DragDropFileUploadDirective;
  beforeEach(() => {
    directive = new DragDropFileUploadDirective();

    spyOn(event, 'stopPropagation');
    spyOn(event, 'preventDefault');
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  describe('drag over', () => {
    it('should process drag over event', () => {
      directive.dragOver(event);

      expect(event.stopPropagation).toHaveBeenCalledTimes(1);
      expect(event.preventDefault).toHaveBeenCalledTimes(1);
      expect(directive.background).toEqual('#e2eefd');
    });
  });

  describe('drag leave', () => {
    it('should process drag leave event', () => {
      directive.dragLeave(event);

      expect(event.stopPropagation).toHaveBeenCalledTimes(1);
      expect(event.preventDefault).toHaveBeenCalledTimes(1);
      expect(directive.background).toEqual('#ffffff');
    });
  });

  describe('drop', () => {
    it('should process drop event', () => {
      directive.drop(event);

      expect(event.stopPropagation).toHaveBeenCalledTimes(1);
      expect(event.preventDefault).toHaveBeenCalledTimes(1);
      expect(directive.background).toEqual('#ffffff');
    });
    it('should emit drop event', () => {
      spyOn(directive.fileDropped, 'emit');

      directive.drop(event);
      expect(directive.fileDropped.emit).toHaveBeenCalledOnceWith(event);
    });
  });
});
