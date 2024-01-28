import { AfterViewInit, Component, ElementRef, HostListener, NgZone, ViewChild } from '@angular/core';
import { SceneService } from './scene.service';
import * as THREE from 'three';

@Component({
  selector: 'app-three',
  standalone: true,
  imports: [],
  templateUrl: './three.component.html',
  styleUrl: './three.component.scss'
})
export class ThreeComponent implements AfterViewInit {

  @ViewChild("myCanvas", { static: true }) private canvasRef!: ElementRef;

  constructor(
    public scene: SceneService,
    private ngZone: NgZone
  ) { }

  ngAfterViewInit() {
    this.scene.OnInit(
      this.getAspectRatio(),
      this.canvas,
      devicePixelRatio,
      this.canvas.clientWidth,
      this.canvas.clientHeight
    );

    // レンダリングする
    this.animate();
  }

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  private getAspectRatio(): number {
    if (this.canvas.clientHeight === 0) {
      return 0;
    }
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  private animate(): void {
    // We have to run this outside angular zones,
    // because it could trigger heavy changeDetection cycles.
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener("DOMContentLoaded", () => {
        this.scene.render();
      });
    });
  }

  // マウスクリック時のイベント
  @HostListener("pointerdown", ["$event"])
  public onMouseDown(event: MouseEvent) {
    const mouse: THREE.Vector2 = this.getMousePosition(event);
    this.scene.detectObject(mouse, "click");
  }

  // マウスクリック時のイベント
  // @HostListener("pointerup", ["$event"])
  public onMouseUp(event: MouseEvent) {
    const mouse: THREE.Vector2 = this.getMousePosition(event);
    this.scene.detectObject(mouse, "select");
  }

  // マウス位置とぶつかったオブジェクトを検出する
  private getMousePosition(event: MouseEvent): THREE.Vector2 {
    event.preventDefault();
    const rect = this.scene.getBoundingClientRect();
    const mouse = new THREE.Vector2();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    return mouse;
  }

  // ウインドウがリサイズした時のイベント処理
  @HostListener("window:resize", ["$event"])
  public onResize(event: Event) {
    this.scene.onResize(
      this.getAspectRatio(),
      window.innerWidth,
      window.innerHeight
    );
  }

}
