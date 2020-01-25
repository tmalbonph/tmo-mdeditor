import {
  Component,
  ElementRef,
  EventEmitter,
  ViewChild,
  AfterViewInit,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import * as SimpleMDE from 'simplemde';
import { MarkdownEditorOptions } from './../markdown-editor-options';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'tmo-docs-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditorComponent implements OnInit, AfterViewInit, OnDestroy {
  private _markdown = new BehaviorSubject<any>([]);

  @Input()
  public set content(value) {
    // set the latest value for content BehaviorSubject
    this._markdown.next(value);
  }

  public get content() {
    // get the latest value from _content BehaviorSubject
    return this._markdown.getValue();
  }

  @Output() markdownChange = new EventEmitter<string>();
  @Output() saveMarkdown = new EventEmitter<string>();
  @Output() cancelEditWithoutSaving = new EventEmitter<string>();
  @ViewChild('simplemde', { static: false }) textarea: ElementRef;
  private simplemde: SimpleMDE;

  constructor(
    private editorOptions: MarkdownEditorOptions // injected by ng; constructor injection
  ) {}

  ngOnInit() {
    this._markdown.subscribe(content => {
      if (this.simplemde) this.simplemde.value(content);
    });
  }

  initializeEditor() {
    // verify that the editor options are valid;
    if (
      typeof this.editorOptions !== 'object' ||
      typeof this.editorOptions !== 'object'
    ) {
      console.log(`EditorComponent: The editor options are not valid.`);
      throw new Error('The [MarkdownEditorOptions] is not an object.');
    }

    this.editorOptions.initialValue = this.content;
    this.editorOptions.element = this.textarea.nativeElement;
    this.editorOptions.toolbar = [
      'bold',
      'italic',
      'heading',
      'strikethrough',
      '|',
      'code',
      'quote',
      'ordered-list',
      'unordered-list',
      '|',
      'link',
      'image',
      'table',
      'horizontal-rule',
      '|',
      'preview',
      'side-by-side',
      'fullscreen',
      '|',
      'guide',
      '|',
      {
        name: 'save',
        action: editor => this.saveMarkdown.emit(editor.value()),
        className: 'fa fa-save',
        title: 'Save Markdown'
      },
      {
        name: 'cancel',
        action: editor => this.cancelEditWithoutSaving.emit(''),
        className: 'fa fa-window-close',
        title: 'Close without saving'
      },
      '|'
    ];
    this.simplemde = new SimpleMDE.default(this.editorOptions);
  }

  ngOnDestroy() {
    this.simplemde = null;
    this._markdown.unsubscribe();
  }

  ngAfterViewInit() {
    this.initializeEditor();

    if (this.simplemde != null) {
      this.simplemde.codemirror.on('change', () => {});
    } else {
      console.log(`EditorComponent: is null.`);
    }
  }
}
