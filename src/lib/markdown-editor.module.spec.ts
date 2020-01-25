import { async, TestBed } from '@angular/core/testing';
import { MarkdownEditorModule } from './markdown-editor.module';

describe('MarkdownEditorModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MarkdownEditorModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(MarkdownEditorModule).toBeDefined();
  });
});
